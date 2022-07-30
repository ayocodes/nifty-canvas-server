import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import * as functions from "firebase-functions";
import { aliases } from "./utils/constants.js";
import { generateCeramic } from "./utils/helper.js";

import cors from "cors";
const corsHandler = cors({ origin: true });


export default functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(async (request, response) => {
    try {
      return corsHandler(request, response, async () => {
        const { artCid, did } = request.body;

        const adminCeramic = await generateCeramic(
          "what is this that concord coward"
        );

        const adminModel = new DataModel({
          ceramic: adminCeramic,
          aliases,
        });

        const adminDataStore = new DIDDataStore({
          ceramic: adminCeramic,
          model: adminModel,
        });

        const doc = await adminDataStore.get("niftyCanvasGallery");
        console.log(doc);

        let gallery: any[] = [];

        if (doc) {
          gallery = [...doc?.data];
        }

        gallery.push({
          artCid,
          did,
          createdAt: Date.now(),
        });
        const data = { data: [...gallery] };
        const streamid = await adminDataStore.set("niftyCanvasGallery", {
          ...data,
        });

        console.log(streamid);
        response.send(JSON.stringify({ errors: false }));
      });
    } catch (error) {
      functions.logger.error(error);
      response.send(JSON.stringify({ errors: true }));
    }
  });
