const supplierCsvString =
  '"SupplierId","supplierName","whiteLabelId","dataAvailable","SmallSupplier (PLACEHOLDER)","supplierRank","overallRating","overallRank","Previous Rank","complaintsRating","complaintsNumber","contactRating","contactTime","contactEmail%","contactSocialMedia","guaranteeRating","guaranteesList","contactInformation","billingInformation","openingHours","fuelMix"\n' +
  '"15","Energy Supplier 1","","TRUE","FALSE","1","3.77","7","-6","3","26.60","4.4","00:37","97","N/A","3","Vulnerability Commitment","Telephone: 0800 1234567, Email: home@example.com, Website: www.example.com, Web Chat: No, Ring backs: Yes, Mobile hotline: No, Minicom / Text: No,","Direct debit: Yes, Cash or cheque: Yes, Prepayment: Yes,","Monday: 9am - 7pm, Tuesday: 9am - 7pm, Wednesday: 9am - 7pm, Thursday: 9am - 7pm, Friday: 9am - 7pm, Saturday: 9am - 1pm,  Sunday: Closed","Fossil fuel: 0%, Nuclear: 0%, Renewable: 100%, Other: 0%,"\n' +
  '"100","Energy Supplier 2","","TRUE","FALSE","2","3.31","2","0","3","21.3","3.2","03:28","99.6","N/A","5","Switch Guarantee, Vulnerability Commitment","Telephone: 0800 123 456, Email: hello@example.com, Website: www.example.com.co.uk, Web Chat: Yes, Ring backs: No, Mobile hotline: No, Minicom / Text: No,","Direct debit: Yes, Cash or cheque: No, Prepayment: No,","Monday: 8.30am - 5pm, Tuesday: 8.30am - 5pm, Wednesday: 8.30am - 5pm, Thursday: 8.30am - 5pm, Friday: 8.30am - 5pm, Saturday: 9am - 2pm  Sunday: Closed,","Fossil fuel: 0%, Nuclear: 0%, Renewable: 100%, Other: 0%,"\n' +
  '"38","Energy Supplier 3","","TRUE","FALSE","3","3.27","9","-6","1","109.2","4.4","01:04","95.9","N/A","5","Switch Guarantee, Vulnerability Commitment","Telephone: 0330 000 0000 (PAYM), 0330 000 0000 (PAYG) Email: hello@example.com Website: www.example.com Web chat: Yes Ring backs: Yes Mobile hotline: 01173 326 945 Minicom text: No SignVideo: Yes","Direct debit: Yes Cash or cheque: Yes Prepayment: Yes","Pay monthly customers: Mon-Fri 9am-5pm Pay As You Go customers: Mon-Fri 8am to 8pm, Sat-Sun 9am to 5pm","Fossil fuel: 35%, Nuclear: 0%, Renewable: 65%, Other: 0%,"\n' +
  '"72","Energy Supplier 4","0","FALSE","","","","","","","","","","","","","","Telephone:  01234 000 0000 Email: customer.care@example.com Website: www.example.com ","Direct debit: Yes Cash or cheque: No Prepayment: No","Monday: 9am – 5:30pm Tuesday: 9am – 5:30pm Wednesday: 9am – 5:30pm Thursday: 9am – 5:30pm Friday: 9am – 5:30pm Saturday: - Closed Sunday: - Closed ","Fossil fuel: 80.5 Nuclear: 1.7% Renewable: 12.2% Other: 5.6%"';

const file = new File(supplierCsvString, "testData.csv", {
  type: "text/plain",
});

export default file;
