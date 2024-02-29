import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
export default function InformationRow() {
  const { t } = useTranslation()
  return (
    <>
      <Container className="my-40">
        <div>
          <div>
            <h3 className="text-3xl font-bold leading-6 tracking-tighter text-gray-900 dark:text-gray-50">
              {t('company:InformationRow.title')}
            </h3>
            <p className="mt-2 max-w-2xl text-sm font-semibold text-gray-500 dark:text-gray-300">
              {t('company:InformationRow.body')}
            </p>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t('company:InformationRow.name.title')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 sm:mt-0">
                  {t('company:InformationRow.name.body1')}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t('company:InformationRow.establish.title')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 sm:mt-0">
                  {t('company:InformationRow.establish.body1')}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t('company:InformationRow.address.title')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 sm:mt-0">
                  {t('company:InformationRow.address.body1')}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t('company:InformationRow.founders.title')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 sm:mt-0">
                  {new Array(2).fill(0).map((_, i) => (
                    <p key={`InformationRowTableFounders${i}`}>
                      {t(`company:InformationRow.founders.body${i + 1}`)}
                    </p>
                  ))}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t('company:InformationRow.capital.title')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 sm:mt-0">
                  {t('company:InformationRow.capital.body1')}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t('company:InformationRow.bank.title')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 sm:mt-0">
                  {t('company:InformationRow.bank.body1')}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t('company:InformationRow.certification.title')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 sm:mt-0">
                  {new Array(3).fill(0).map((_, i) => (
                    <p key={`InformationRowTableCertification${i}`}>
                      {t(`company:InformationRow.certification.body${i + 1}`)}
                    </p>
                  ))}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t('company:InformationRow.purpose.title')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 sm:mt-0">
                  {new Array(1).fill(0).map((_, i) => (
                    <p key={`InformationRowTablePurpose${i}`}>
                      {t(`company:InformationRow.purpose.body${i + 1}`)}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </>
  )
}
