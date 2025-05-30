import { INotification } from "../../../core/application/ports/out/INotification";

export default class SenderEmail implements INotification{

    send(data: Object): Object {
        console.log("Enviado via Email ",data)
    }

}