import csv from "csvtojson/index";
var log4js = require("log4js");
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: `tmp/application.log` }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' }
  }
});
const customLogger = log4js.getLogger();

// command: npx tsc import.ts --esModuleInterop && node import.js
export const gfValueTypes = ['FIXED', 'PERCENTAGE'] as const;
export type GFValueType = typeof gfValueTypes[number];

export type CsvExtraItem = {
  vehicle_type: vehicleTypes;
  vehicle_manufacturer?: string;
  vehicle_model: string;
  vehicle_condition: vehicleConditionTypes;
  id: string;
  type: extraTypes;
  title: string;
  description?: string;
  media_images?: string;
  pricing_value: string;
  pricing_valueType: GFValueType;
  availability_leadTime: string;
  isDefault: string;
  category: string;
  quantity_min: string;
  quantity_max: string;
  quantity_default: string;
  vap: string;
};

export class CsvExtraItemModel {
  csvExtraItem: CsvExtraItem;

  constructor(csvExtraItem: CsvExtraItem) {
    this.csvExtraItem = csvExtraItem;
  }
  isRequiredField(field: string): boolean {
    return [
      'id',
      'type',
      'title',
      'pricing_value',
      'pricing_valueType',
      'availability_leadTime',
      'isDefault',
      'quantity_min',
      'quantity_max',
      'quantity_default',
      'vap',
    ].includes(field);
  }
  isEmptyField(field: keyof CsvExtraItem): boolean {
    return !!this.csvExtraItem[field];
  }
}
export enum vehicleTypes {
  CAR = 'CAR',
  BIKE = 'BIKE',
  VAN = 'VAN'
}
export enum vehicleConditionTypes {
  NEW = 'NEW',
  USED = 'USED',
  PRE_ORDER = 'PRE_ORDER'
}

export enum extraTypes {
  EXTRA = 'EXTRA',
  SERVICE_PLAN = 'SERVICE_PLAN',
  ACCESSORY = 'ACCESSORY'
}
const CsvExtraItemType = [
  'id',
  'type',
  'title',
  'pricing_value',
  'pricing_valueType',
  'availability_leadTime',
  'isDefault',
  'quantity_min',
  'quantity_max',
  'quantity_default',
  'vap',
] as const;

let validationErrors: string[][] = [];


function isEmptyField(fieldValue: any): boolean {
  return fieldValue == undefined || fieldValue === '';
}
const validateItem = (csvItem: CsvExtraItem): string[] => {
  let itemValidationErrors: string[] = [];

  CsvExtraItemType.forEach((key, index) => {
    type csvItemProperties = keyof CsvExtraItem;

    // const fieldValue = csvItem[key as csvItemProperties]
    // if (isEmptyField(fieldValue)) {
    //   itemValidationErrors.push(
    //       `required field missed: '${key}'`
    //   );
    // }
    if (!!csvItem[key as csvItemProperties]) {
      itemValidationErrors.push(
          `required field missed: '${key}'`
      );
    }
  });
  
  if (
      !Object.values(vehicleTypes).includes(
          csvItem.vehicle_type as vehicleTypes
      )
  ) {
    itemValidationErrors.push(
        `Invalid vehicle type: ${csvItem.vehicle_type}.`
    );
  }
  if (
      !Object.values(extraTypes).includes(csvItem.type as extraTypes)
  ) {
    itemValidationErrors.push(
        `Invalid extra type: ${csvItem.type}.`
    );
  }
  if (
      !Object.values(vehicleConditionTypes).includes(
          csvItem.vehicle_condition as vehicleConditionTypes
      )
  ) {
    itemValidationErrors.push(
        `Invalid vehicle condition: ${csvItem.vehicle_condition}.`
    );
  }
  if (
      !Object.values(gfValueTypes).includes(
          csvItem.pricing_valueType
      )
  ) {
    itemValidationErrors.push(
        `Invalid pricing value type: ${csvItem.pricing_valueType}.`
    );
  }
  return itemValidationErrors;
}

const importDataset = async () => {
  const extras: any[] = [];
  let numberItem = 0;
  let successItem = 0;
  let failedItem = 0;
  try {
    await csv({
      delimiter: ['|', ',']
    }).fromFile('files/extras_import.csv')
        .subscribe((item: CsvExtraItem) => {
          numberItem++;
          const itemErrors = validateItem(item);
          customLogger.info(`${numberItem} item: ${JSON.stringify(item)}`);
          customLogger.info(`${numberItem} item: %o`, item);
          if (itemErrors.length > 0) {
            failedItem++;
            customLogger.error(itemErrors);
            validationErrors.push(itemErrors);
          } else {
            successItem++;
            // create here
            console.info(`success imported: ${numberItem}| ${item.pricing_value} | ${item.vehicle_condition} | ${item.vehicle_type} | ${item.type}`);
          }
          // console.log(item);
        });

    customLogger.info(`success imported ${successItem}`);
    customLogger.info(`failed imported ${failedItem}`);
  } catch (e) {
    console.log(`error ${JSON.stringify(e)}`);
  }
}
importDataset();