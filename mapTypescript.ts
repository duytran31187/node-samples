
// need to compile js file by running command: npx tsc mapTypescript.t
// then run: node mapTypescript.js

enum ExtrasTypes {
    FIXED_TYPE = 'fixed',
    PERCENTAGE_TYPE = 'percentage'
}
const dataProviders: Map<ExtrasTypes, (data: any) => void> = new Map<ExtrasTypes, (data: any) => void>();
dataProviders.set(ExtrasTypes.FIXED_TYPE, (data ) => { console.log(`fixed data ${data}`)});
dataProviders.set(ExtrasTypes.PERCENTAGE_TYPE,(data) => { console.log(`percentage data ${data}`)});

const fixedFunc = dataProviders.get(ExtrasTypes.FIXED_TYPE);
fixedFunc(10);

const percentageFunc = dataProviders.get(ExtrasTypes.PERCENTAGE_TYPE);
percentageFunc(10);
