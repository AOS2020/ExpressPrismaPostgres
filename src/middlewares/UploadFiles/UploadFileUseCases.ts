import multer from "multer";
import path from "path";
import fs from "fs";
import mime from "mime-types"
import {Request} from "express-serve-static-core";


class UploadFileUseCases {
    private URL : string = path.basename("files");
    private MAX_SIZE_TWO_MEGABYTE : number = 2 * 1024 * 1024;
    constructor() {}
    private storage(): multer.StorageEngine {
        return multer.diskStorage({
            destination: (req, file, cb) => {

                if (!fs.existsSync(this.URL)) {
                    fs.mkdirSync(this.URL);
                }
                cb(null, this.URL);
            },
            filename: (req, file, cb) => {
                const type = mime.extension(file.mimetype);
                const {originalname} = file  
                cb(null, originalname);
            }
        });
    }

    private fileFilter() {

        return(req : Request, file : Express.Multer.File, cb : multer.FileFilterCallback) => {
            const type = mime.extension(file.mimetype);
           
            const conditions = ["file/png", "file/jpg", "file/jpeg"];

            if (conditions.includes(`${type}`)) {
               return  cb(null, true);
            }
            cb(null, false)

        }

    }

    get getConfig(): multer.Options {
        return {
            storage: this.storage(),
            fileFilter: this.fileFilter(),
            limits: {
                fileSize: this.MAX_SIZE_TWO_MEGABYTE
            }
        }
    }
}

export {UploadFileUseCases};


