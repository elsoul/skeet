interface Common {
  you: string
  start: string
  aiType: string
  model: string
  maxToken: string
  temperature: string
  skeetAiModeText: string
  isSelected: string
  shutdown: string
  howAboutThis: string
  updateFile: string
  getFileDesc: string
  currentSet: string
  areYouReady: string
  firestoreMode: string
  firestoreModeDesc: string
  MayICreateFile: string
  MayIUpdateFile: string
  MayIAddDoc: string
  created: string
  thenRun: string
  mayISyncModel: string
  confirmSyncModel: string
  example: string
  addedDoc: string
}

interface Warning {
  temperature: string
  gptKey: string
  gcpKey: string
}

interface BaseMode {
  init: string
  modeDesc: string
  ExitingMode: string
}

interface ExtendedMode extends BaseMode {
  example1?: string
  example2?: string
  list1?: string
  currentSet?: string
  warning?: string
  schemaConfirm?: string
  migrationConfirm?: string
  scaffoldConfirm?: string
  mayISyncModel?: string
  http?: string
  pubsub?: string
  firestore?: string
  storage?: string
  schedule?: string
  auth?: string
  modeDesc2?: string
}

interface SkeetLog {
  common: Common
  warning: Warning
  skeetMode: Record<string, unknown>
  typedocMode: BaseMode
  translateMode: ExtendedMode
  firestoreMode: ExtendedMode
  methodMode: ExtendedMode
  functionMode: ExtendedMode
  prismaMode: ExtendedMode
}
