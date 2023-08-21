// command: npx tsc array_to_union_type.ts && node array_to_union_type.js
// convert an array to union types by one of 2 ways:
//1
export const UserTypes2 = ['Admin', 'Editor', 'Reader', 
'Anonymous'] as const; 
type UserType2 = typeof UserTypes2[number]; 

//2
export const UserTypes = ['Admin', 'Editor', 'Reader', 'Anonymous'];
type UserType = typeof UserTypes[0] | typeof UserTypes[1] | typeof UserTypes[2] | typeof UserTypes[3]; // result: UserTypes: string[]
