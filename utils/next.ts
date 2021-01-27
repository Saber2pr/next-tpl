export const getNoopServerSideProps = (ctx: any) => ({ props: {} })

// export const getServerSideProps = disableAutomaticStaticOptimization
export const disableAutomaticStaticOptimization = getNoopServerSideProps
