let chai = require("chai")
let should = require("should")
let chaiHttp = require("chai-http")
let server = require("../app")
let mongoose = require('mongoose')
let Patient = require("../model/patients")

chai.should()
chai.use(chaiHttp)

describe('Patient API', ()=>{
    beforeEach((done) => { //Before each test we empty the database
        Patient.remove({}, (err) => { 
           done();           
        });        
    });
    /**
     * Test the /Get Route
     */
    describe("GET /api/patients", ()=>{
        it("It should get all the patients", (done) => {
            chai.request(server)
            .get("/api/patients")
            .end((err,response) => {
                response.should.have.status(200)
                response.body.should.be.a('array')
            done()
            })
        })  
    })

    /**
     * Test the /Get/:id Route
     */
    describe("GET /api/patients/:id", ()=>{
        it("It should get single patient details", (done) => {
            let patientDetails = new Patient({
                first_name: "John",
                last_name: "Doe",
                address: "21 Younge Street",
                date_of_birth: "1996/05/10",
                department: "Emergency",
                doctor: "Jane Doe",
            })
            patientDetails.save((err,patient) => {
                chai.request(server)
                .get("/api/patients/"+patient.id)
                .send(patient)
                .end((err,response) => {
                    response.should.have.status(200)
                done()
            })
            })
        })  
    })
})