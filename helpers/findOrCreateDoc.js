const Document = require("../Model/document.model");
const defaulVal = "";

const findOrCreateDocument = async (id) => {
  if (id == null) return;
  const doc = await Document.findById(id);
  if (doc) return doc;
  return await Document.create({ _id: id, data: defaulVal });
};

module.exports = findOrCreateDocument;
