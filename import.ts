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
  vehicle_type: VehicleTypes;
  vehicle_manufacturer?: string;
  vehicle_model: string;
  vehicle_condition: VehicleConditionTypes;
  id: string;
  type: ExtraTypes;
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
    return !this.csvExtraItem[field];
  }
}
export enum VehicleTypes {
  CAR = 'CAR',
  BIKE = 'BIKE',
  VAN = 'VAN'
}
export enum VehicleConditionTypes {
  NEW = 'NEW',
  USED = 'USED',
  PRE_ORDER = 'PRE_ORDER'
}

 enum ExtraTypes {
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
const itemByVehicleTypes = new Map<VehicleTypes, CsvExtraItem[]>();

function isEmptyField(fieldValue: any): boolean {
  return fieldValue == undefined || fieldValue === '';
}
const validateItem = (csvItem: CsvExtraItem): string[] => {
  let itemValidationErrors: string[] = [];

  CsvExtraItemType.forEach((key, index) => {
    type csvItemProperties = keyof CsvExtraItem;

    const fieldValue = csvItem[key as csvItemProperties]
    if (isEmptyField(fieldValue)) {
      itemValidationErrors.push(
          `required field missed: '${key}'`
      );
    }
    console.log(`required field %s has value is %s vs %s`, key,csvItem[key as csvItemProperties], !csvItem[key as csvItemProperties], !!csvItem[key as csvItemProperties]);
    if (!csvItem[key as csvItemProperties]) {
      itemValidationErrors.push(
          `required field missed: '${key}'`
      );
    }
  });
  
  if (
      !Object.values(VehicleTypes).includes(
          csvItem.vehicle_type as VehicleTypes
      )
  ) {
    itemValidationErrors.push(
        `Invalid vehicle type: ${csvItem.vehicle_type}.`
    );
  }
  if (
      !Object.values(ExtraTypes).includes(csvItem.type as ExtraTypes)
  ) {
    itemValidationErrors.push(
        `Invalid extra type: ${csvItem.type}.`
    );
  }
  if (
      !Object.values(VehicleConditionTypes).includes(
          csvItem.vehicle_condition as VehicleConditionTypes
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
            console.log(`success imported: ${numberItem}| ${item.pricing_value} | ${item.vehicle_condition} | ${item.vehicle_type} | ${item.type}`);
            //
            const arr_key = item.vehicle_type;
            let currentItems = itemByVehicleTypes.get(arr_key);// get current arrays of with this type
            if (!currentItems) {
              currentItems = [];
            }
            currentItems.push(item);
            console.log(`current array of %s is %o`, arr_key, currentItems);
            itemByVehicleTypes.set(arr_key, currentItems);

          }
          // console.log(item);
        });

    customLogger.info(`success imported ${successItem}`);
    customLogger.info(`failed imported ${failedItem}`);
    customLogger.info(`itemByVehicleTypes %o`, itemByVehicleTypes);
  } catch (e) {
    console.log(`error %o`, e);
  }
}
importDataset();