export const tsconfig = () => {
  return `{
  "compilerOptions": {
    "module": "ESNext",
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "outDir": "dist",
    "target": "ESNext",
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "lib": ["esnext"],
    "sourceMap": true,
    "paths": {
      "@/*": ["./src/*"],
      "@common/*": ["../../common/*"]
    }
  },
  "compileOnSave": true,
  "include": [
    "src/*",
    "src/**/*",
    "build.ts",
    "devBuild.ts",
    "../../common/**/*",
    "../common/types",
    "../common/models"
  ],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
`
}
