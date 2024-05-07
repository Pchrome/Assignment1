import express from "express";
import controller from "./Person.controller";
const router = express.Router();


/** Validation middleware */
/** Increases modularity and maintainability */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; /** Regex for Email */
const PHONENUMBER_PATTERN = /^\d{8}$/; /** Regex for PhoneNumber */
const UUID_PATTERN = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; /** regex for UUID as ID */

const validatePersonId = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id: string = req.params.id;
    // Validate UUID format here
    if (!UUID_PATTERN.test(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    next();
};

const validateNewPerson = async(req: express.Request, res: express.Response, next: express.NextFunction)=> {
    const { email, phoneNumber } = req.body;
    /** Add your validation logic for email and phone number here */
    if (!email || !phoneNumber) {
        return res.status(400).json({ message: "Email and phoneNumber are required" });
    }
    if (!email || !EMAIL_PATTERN.test(email)) {
        return res.status(400).json({ message: "Invalid Email format" });
    }

    if (!phoneNumber || !PHONENUMBER_PATTERN.test(phoneNumber)) {
        return res.status(400).json({ message: "Invalid PhoneNumber format" });
    }
    /** Ensure that there exist no 2 emails that are the same */
    const emailExists =  await controller.checkEmailExists(email);
    if (emailExists) {
        return res.status(400).json({ message: "Email address already exists" });
    }
    next();
}

router.get('/:id', validatePersonId, controller.getPersonById);
router.get('/', controller.getAllPersons); /** Dummy EndPoint to get all persons */
router.post('/', validateNewPerson, controller.addPerson);
router.delete('/:id',  validatePersonId, controller.deletePersonById);

export default router;