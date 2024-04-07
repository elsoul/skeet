import baseTemplatePackageJson from '@base-template/package.json'
import baseFunctionsPackageJson from '@base-functions/package.json'
import baseSqlPackageJson from '@base-sql/package.json'
import skeetFuncPackageJson from '@skeet-func-template/package.json'
import { TemplateType } from '@/config/config'

export const TEMPLATE_VERSION = {
  BASE_TEMPLATE: baseTemplatePackageJson.version,
  BASE_FUNCTIONS: baseFunctionsPackageJson.version,
  BASE_SQL: baseSqlPackageJson.version,
  SKEET_FUNC: skeetFuncPackageJson.version,
}

export const getTemplateVersion = (templateType: TemplateType) => {
  switch (templateType) {
    case 'base-template':
      return TEMPLATE_VERSION.BASE_TEMPLATE
    case 'base-functions':
      return TEMPLATE_VERSION.BASE_FUNCTIONS
    case 'base-sql':
      return TEMPLATE_VERSION.BASE_SQL
    case 'skeet-func-template':
      return TEMPLATE_VERSION.SKEET_FUNC
    default:
      return TEMPLATE_VERSION.BASE_TEMPLATE
  }
}
