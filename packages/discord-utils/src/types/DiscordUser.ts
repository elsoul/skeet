export interface DiscordUser {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  premium_type: number
  flags: number
  banner: string | null
  accent_color: string | null
  global_name: string
  avatar_decoration_data: any | null
  banner_color: string | null
}

export interface GuildMember {
  avatar: string | null
  communication_disabled_until: string | null
  flags: number
  joined_at: string
  nick: string | null
  pending: boolean
  premium_since: string | null
  roles: string[]
  unusual_dm_activity_until: string | null
  user: DiscordUser
  mute: boolean
  deaf: boolean
}
