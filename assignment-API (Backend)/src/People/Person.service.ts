import { Person } from './Person.model';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from '../Email/PersonProcess.service';

/** Array to hold person Object to simulate database */
let persons: Person[] = [];

/** Load JSON data into memory when the application starts */ 
const rawData = fs.readFileSync('./src/json_data.json', 'utf-8');
persons = JSON.parse(rawData);

export class PeopleService {

    /** Dep. Injection */
    private emailService : EmailService;

    constructor(emailService : EmailService) {
        this.emailService = emailService;
    }
    /** Get Person Object by ID as unique identifier */
    getPersonById = async (id: string)=> {
        return persons.find((p) => p.id === id); /** Returns a person or undefined when no matches */
    };
    
    /** Add Person Object through (email,phoneNumber) */
    addPerson = async (email: string, phoneNumber: string)=> {
        const id = uuidv4(); /** Generate a UUID as id */ 
        const newPerson: Person = { id, email, phoneNumber };
        persons.push(newPerson);
        this.emailService.sendEmail(newPerson);
        return newPerson;
    };

    /** Delete Person Object by given Id as unique identifier*/
    deletePersonById = async (id: string)=> {
        const index = persons.findIndex((p) => p.id === id);
        if (index !== -1) {
        persons.splice(index, 1);
        }
    };
    
    /** Dummy Method to get all persons */
    getAllPersons = async ()=> {
        return persons;
    };

    /** Helper function to check for duplicated email */
    getPersonByEmail = async(email: string) => {
        return persons.find(person => person.email === email);
      }
}
