export type DiscordRouterParams = {
  app_permissions: string
  application_id: string
  channel: Channel
  channel_id: string
  data: CommandData | ActionData
  entitlement_sku_ids: string[]
  entitlements: any[]
  guild: Guild
  guild_id: string
  guild_locale: string
  id: string
  locale: string
  member: Member
  token: string
  type: number
  version: number
}

export type Channel = {
  flags: number
  guild_id: string
  id: string
  last_message_id: string
  name: string
  nsfw: boolean
  parent_id: string
  permissions: string
  position: number
  rate_limit_per_user: number
  topic: string | null
  type: number
}

export type CommandData = {
  guild_id: string
  id: string
  name: string
  options: CommandOption[]
  type: number
}

export type ActionData = { component_type: number; custom_id: string }

export type CommandOption = {
  name: string
  value: string
}

export type Guild = {
  features: string[]
  id: string
  locale: string
}

export type Author = {
  avatar: string
  avatar_decoration_data: any | null
  bot: boolean
  discriminator: string
  global_name: string | null
  id: string
  premium_type: number
  public_flags: number
  username: string
}

export type Message = {
  attachments: any[]
  author: Author
  channel_id: string
  components: any[]
  content: string
  edited_timestamp: string | null
  embeds: any[]
  flags: number
  id: string
  mention_everyone: boolean
  mention_roles: string[]
  mentions: any[]
  pinned: boolean
  timestamp: string
  tts: boolean
  type: number
}

export type Member = {
  avatar: string | null
  communication_disabled_until: string | null
  deaf: boolean
  flags: number
  joined_at: string // or Date if you want to use a Date object
  mute: boolean
  nick: string | null
  pending: boolean
  permissions: string
  premium_since: string | null
  roles: string[]
  unusual_dm_activity_until: string | null
  user: User
}

export type User = {
  avatar: string
  avatar_decoration_data: any | null
  discriminator: string
  global_name: string
  id: string
  public_flags: number
  username: string
}
