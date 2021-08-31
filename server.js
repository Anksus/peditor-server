require("./helpers/dbConnect");
const findOrCreateDocument = require("./helpers/findOrCreateDoc");
const Document = require("./Model/document.model");

const port = process.env.PORT || 3001;

const io = require("socket.io")(port, {
  cors: {
    origin: "https://peditor.anksus.me",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    let document;
    try {
      document = await findOrCreateDocument(documentId);
    } catch (error) {
      console.log(error);
    }
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      try {
        await Document.findByIdAndUpdate(documentId, { data });
      } catch (error) {
        console.log(erro);
      }
    });
  });
});
