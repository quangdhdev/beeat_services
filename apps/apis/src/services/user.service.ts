import { prisma } from '../lib/database';
import { Prisma } from '@prisma/client';
import { loggers } from '../lib/logger';

export interface UpdateUserProfileData {
  fullName?: string;
  phone?: string;
  bio?: string;
  preferences?: {
    language?: string;
    timezone?: string;
    notifications?: {
      email?: boolean;
      courseUpdates?: boolean;
      promotions?: boolean;
      weeklyDigest?: boolean;
    };
  };
}

export class UserService {
  async getUserProfile(userId: string) {
    loggers.service.debug({ userId }, 'Getting user profile');

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        preferences: user.preferences
          ? {
              language: user.preferences.language,
              timezone: user.preferences.timezone,
              notifications: {
                email: user.preferences.emailNotifications,
                courseUpdates: user.preferences.courseUpdateNotifications,
                promotions: user.preferences.promotionNotifications,
                weeklyDigest: user.preferences.weeklyDigestNotifications,
              },
            }
          : {
              language: 'en',
              timezone: 'UTC',
              notifications: {
                email: true,
                courseUpdates: true,
                promotions: false,
                weeklyDigest: true,
              },
            },
      },
    };
  }

  async updateUserProfile(userId: string, data: UpdateUserProfileData) {
    const updateData: Prisma.UserUpdateInput = {};

    if (data.fullName) updateData.fullName = data.fullName;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.bio !== undefined) updateData.bio = data.bio;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    if (data.preferences) {
      const preferencesData: Prisma.UserPreferencesUpsertArgs['create'] = {
        userId,
        language: data.preferences.language || 'en',
        timezone: data.preferences.timezone || 'UTC',
        emailNotifications: data.preferences.notifications?.email ?? true,
        courseUpdateNotifications:
          data.preferences.notifications?.courseUpdates ?? true,
        promotionNotifications:
          data.preferences.notifications?.promotions ?? false,
        weeklyDigestNotifications:
          data.preferences.notifications?.weeklyDigest ?? true,
      };

      await prisma.userPreferences.upsert({
        where: { userId },
        create: preferencesData,
        update: {
          language: data.preferences.language,
          timezone: data.preferences.timezone,
          emailNotifications: data.preferences.notifications?.email,
          courseUpdateNotifications:
            data.preferences.notifications?.courseUpdates,
          promotionNotifications: data.preferences.notifications?.promotions,
          weeklyDigestNotifications:
            data.preferences.notifications?.weeklyDigest,
        },
      });
    }

    return {
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        updatedAt: user.updatedAt,
      },
    };
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });

    return {
      message: 'Avatar uploaded successfully',
      avatarUrl: user.avatar,
    };
  }

  async createOrUpdateUser(supabaseUser: {
    id: string;
    email: string;
    user_metadata?: { full_name?: string };
  }) {
    try {
      loggers.service.debug(
        { userId: supabaseUser.id },
        'Creating or updating user'
      );

      // Validate input
      if (!supabaseUser.id || !supabaseUser.email) {
        throw new Error('Invalid user data: missing id or email');
      }

      const userData = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        fullName:
          supabaseUser.user_metadata?.full_name ||
          supabaseUser.email.split('@')[0] ||
          'User',
        lastLoginAt: new Date(),
      };

      loggers.service.debug({ userData }, 'User data prepared');

      // Try to find existing user by ID first, then by email
      let existingUser = await prisma.user.findUnique({
        where: { id: supabaseUser.id },
      });

      // If not found by ID, try to find by email
      if (!existingUser) {
        existingUser = await prisma.user.findUnique({
          where: { email: supabaseUser.email },
        });

        if (existingUser) {
          loggers.service.debug(
            {
              userId: existingUser.id,
              email: existingUser.email,
              supabaseId: supabaseUser.id,
            },
            'Found user by email, will update ID'
          );
        }
      }

      let user;
      if (existingUser) {
        // Update existing user (either by ID or email)
        loggers.service.debug(
          { userId: existingUser.id },
          'Updating existing user'
        );

        // If user found by email but ID is different, update the ID
        const updateData: any = {
          lastLoginAt: userData.lastLoginAt,
          fullName: userData.fullName,
        };

        // Only update ID if it's different (to avoid conflicts)
        if (existingUser.id !== supabaseUser.id) {
          updateData.id = supabaseUser.id;
          loggers.service.debug(
            {
              oldId: existingUser.id,
              newId: supabaseUser.id,
            },
            'Updating user ID'
          );
        }

        user = await prisma.user.update({
          where: { id: existingUser.id },
          data: updateData,
        });

        // If ID was changed, we need to update related records
        if (existingUser.id !== supabaseUser.id) {
          // Update user preferences
          await prisma.userPreferences.updateMany({
            where: { userId: existingUser.id },
            data: { userId: supabaseUser.id },
          });

          // Update other related records if needed
          // Note: This might need more complex logic depending on your schema
        }
      } else {
        // Create new user
        loggers.service.debug({ userId: supabaseUser.id }, 'Creating new user');
        user = await prisma.user.create({
          data: userData,
        });

        // Create default preferences for new user
        await prisma.userPreferences.create({
          data: {
            userId: user.id,
            language: 'en',
            timezone: 'UTC',
            emailNotifications: true,
            courseUpdateNotifications: true,
            promotionNotifications: false,
            weeklyDigestNotifications: true,
          },
        });
      }

      loggers.service.debug(
        { userId: user.id },
        'User operation completed successfully'
      );
      return user;
    } catch (error) {
      loggers.service.error(
        {
          userId: supabaseUser.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        'Error in createOrUpdateUser'
      );

      // Re-throw error để caller có thể xử lý
      throw error;
    }
  }
}
