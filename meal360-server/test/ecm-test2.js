import {postDB, updateDB, deleteRecord, getFromDB} from "../extCommMod.js"

// TODO Test 06: postDB operation
console.log("Test 06 results:");
let email = "anEmail@gmail.com";
let result = await getFromDB("dietPref", ["email"], ["=="], [email])
// should be false
console.log("Email " + email + " exists currently: " + (result.docs.length > 0));

let params = {
    dietType: "vegan",
    email,
    exclude: ["shellfish", "tomato", "peanuts", "pineapple"],
    targetCalories: 2200
};

await postDB("dietPref", "anEmail@gmail.com", params);
console.log("POST done.");
// validate result
result = await getFromDB("dietPref", ["email"], ["=="], [email])
let docs = result.docs;
console.log("Email " + email + " now exists: " + (docs.length > 0));
console.log(docs[0].data());

// TODO Test 08: updateDB - pre-existing record
console.log("\nTest 08:");
email = "abcd@gmail.com";
result = await getFromDB("dietPref", ["email"], ["=="], [email]);
docs = result.docs;
console.log("Record exists for " + email + ": " + (docs.length > 0));
console.log(docs[0].data());

await updateDB("dietPref", ["email"], ["=="], [email], {exclude: ["chicken"]});
console.log("UPDATE done.");
// validate result
result = await getFromDB("dietPref", ["email"], ["=="], [email]);
docs = result.docs;
console.log("Data for " + email + " is now:");
console.log(docs[0].data())

// TODO Test 09: updateDB - non-existent record
console.log("\nTest 09:");
email = "ffff@hotmail.com";
result = await getFromDB("dietPref", ["email"], ["=="], [email]);
docs = result.docs;
console.log("Record exists for " + email + ": " + (docs.length > 0));

await updateDB("dietPref", ["email"], ["=="], [email], params);
console.log("UPDATE conducted.");
// validate result
result = await getFromDB("dietPref", ["email"], ["=="], [email]);
docs = result.docs;
console.log("Record exists for " + email + ": " + (docs.length > 0));

// TODO Test 11: deleteRecord - non-existing record
console.log("\nTest 11: Using previous test parameters.");
result = await getFromDB("dietPref", [], [], []);
docs = result.docs;
console.log("Number of records: " + docs.length);

await deleteRecord("dietPref", ["email"], ["=="], [email]);
console.log("DELETE conducted.");
// validate nothing happened
result = await getFromDB("dietPref", [], [], []);
docs = result.docs;
console.log("Number of records: " + docs.length);

// TODO Test 10: deleteRecord - pre-existing record
console.log("\nTest 10:")
email = "test@test2.com"
// ensure record exists for this email
result = await getFromDB("dietPref", ["email"], ["=="], [email]);
console.log("Record exists for " + email + ": " + (result.docs.length > 0));
// delete it
await deleteRecord("dietPref", ["email"], ["=="], [email]);
console.log("DELETE done.");
// validate delete occurred
result = await getFromDB("dietPref", ["email"], ["=="], [email]);
// should be false
console.log("Record exists for " + email + ": " + (result.docs.length > 0));
