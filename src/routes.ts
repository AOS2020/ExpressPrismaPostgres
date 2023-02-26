import {Router} from "express";
import { AlertController } from "./controllers/AlertController";
import {AuthenticateUserController} from "./controllers/AuthenticateUserController";
import { CamController } from "./controllers/CamController";
import {PlateCaptureController} from "./controllers/PlateCaptureController";
import {UsersController} from "./controllers/UsersController";
import {ensureAuthenticated} from "./middlewares/ensureAuthenticated";
import multer from 'multer';
import { UploadFileUseCases } from "./middlewares/UploadFiles/UploadFileUseCases";
import { PermissionBaseController } from "./middlewares/groupPermissions/PermissionBaseController";

const routes = Router();



//middlewares login
const authenticateUser = new AuthenticateUserController()

//middleware verificação permissão grupos e respectivas rotas
const {checkPermissions}= new PermissionBaseController()



//middleware upload de arquivos
const uploadFileUseCases= new UploadFileUseCases()



//login
routes.post('/login', authenticateUser.execute)


// User
const Users = new UsersController();


routes.post('/user/create',ensureAuthenticated,checkPermissions, Users.create)
routes.post('/user/index', ensureAuthenticated,checkPermissions, Users.index)
routes.post('/user/update', ensureAuthenticated,checkPermissions, Users.update)
routes.post('/user/delete', ensureAuthenticated,checkPermissions, Users.delete)
routes.post('/user/indexall', ensureAuthenticated,checkPermissions, Users.indexAll)
routes.post('/user/resettoken',ensureAuthenticated,checkPermissions, Users.updateTokenUser)

// PlateCapture
const plateCapture = new PlateCaptureController()
routes.post('/platecapture/create',multer(uploadFileUseCases.getConfig).single("files"), plateCapture.create)
routes.post('/platecapture/index',ensureAuthenticated,checkPermissions, plateCapture.index)

//Cam
const Cam = new CamController()
routes.post('/cam/create',  Cam.create)
routes.post('/cam/index',ensureAuthenticated,checkPermissions, Cam.index)
routes.post('/cam/update', ensureAuthenticated,checkPermissions, Cam.update)
routes.post('/cam/delete', ensureAuthenticated,checkPermissions, Cam.delete)



//Alert
const Alert = new AlertController()
routes.post('/alert/create',ensureAuthenticated,checkPermissions,  Alert.create)
routes.post('/alert/index',ensureAuthenticated,checkPermissions, Alert.index)
routes.post('/alert/update', ensureAuthenticated,checkPermissions, Alert.update)
routes.post('/alert/delete', ensureAuthenticated,checkPermissions, Alert.delete)



export {
    routes
};
