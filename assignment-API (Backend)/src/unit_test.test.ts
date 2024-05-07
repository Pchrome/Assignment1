const request = require("supertest");
const httpServer = require("./server");
import { EmailService } from './Email/PersonProcess.service';


/** Testing Dummy method to retrieve all persons */
describe("GET /people", () => {
    it("It should respond with an array of persons", async () => {
        const response = await request(httpServer).get("/people");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(5); 
    });
});

/** Testing GetById */
describe("GET /people/:id", () => {
    it("It should return the correct person by ID", async () => {
        const personId = "cd98c56f-afb9-4f89-9f84-92610ff83686";
        const response = await request(httpServer).get(`/people/${personId}`);
        const expectedEmail = "jen@gmail.com";
        const expectedNumber = "78906543";
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("email",expectedEmail); /** Check for email and phoneNumber attributes */
        expect(response.body.data).toHaveProperty("phoneNumber",expectedNumber);
    });

    it("It should return 404 if person ID is not found", async () => {
        const invalidPersonId = "cd98c56f-aab9-4f89-9f84-92610ff89999";
        const response = await request(httpServer).get(`/people/${invalidPersonId}`);
        expect(response.status).toBe(404);
    });
});

/** Testing delete Person Endpoint */
describe("DELETE /people/:id", () => {
    it("It should delete a person by ID", async () => {
        const personId = "cd97c56f-afb9-4f89-9f84-92610ff83685"; /** Get sample Id from Json file */
        const response = await request(httpServer).delete(`/people/${personId}`);
        expect(response.status).toBe(200);
    });
    it("It should return 404 if person ID is not found", async () => {
        const invalidPersonId = "cd98c56f-aab9-4f89-9f84-92610ff89999"; /** Non existent ID */
        const response = await request(httpServer).delete(`/people/${invalidPersonId}`);
        expect(response.status).toBe(404);
    });
});

jest.mock('./Email/PersonProcess.service');
/** Testing addPerson Endpoint */
describe('addPerson', () => {
    let emailServiceMock: jest.Mocked<EmailService>;
  
    beforeEach(() => {
      const req = { body: { email: 'pokechrome@gmail.com', phoneNumber: '12345678' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      emailServiceMock = new EmailService() as jest.Mocked<EmailService>;
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('It should add a person successfully', async () => {
        const res = await request(httpServer).post("/people").send({
            email: "pokechrome@gmail.com",
            phoneNumber: "12345678",
        });
        expect(res.status).toBe(200);
    });
    test('It should not add a person if incorrect phoneNumber format', async () => {
        const res = await request(httpServer).post("/people").send({
            email: "pokechrome@gmail.com",
            phoneNumber: "1245678", /** Incorrect Phone Number Format */
        });
        expect(res.status).toBe(400);
    });
    test('It should not add a person if incorrect email format', async () => {
        const res = await request(httpServer).post("/people").send({
            email: "pokechromegmail.com", /** Incorrect email Format */
            phoneNumber: "12345678", 
        });
        expect(res.status).toBe(400);
    });
    test('It should not add a person if email exists', async () => {
        const res = await request(httpServer).post("/people").send({
            email: "tom@gmail.com", /** Existing Email */
            phoneNumber: "12345678", 
        });
        expect(res.status).toBe(400);
    });
  
});

afterAll(() => {
    httpServer.close();
  });
