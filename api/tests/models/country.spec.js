const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('title and summary errors', () => {
      it('should throw an error if title or summary are null', (done) => {
        Country.create({})
          .then(() => done(new Error('requierd title and summary')))
          .catch(() => done());
      });
      it("should throw an error if title is null", (done) => {
        Country.create({ title: null, summary: "this is how we do it" })
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      
    });
    describe("Creating Countries", () => {
      it("Each country should has next mandatory fields: cca3, name, flags, continents, capital ", async () => {
        let country = await Country.create({
          cca3: "ARG",
          name: "Argentina",
          flags: "string",
          continents: ["LATAM"],
          capital: ["Buenos Aires"],
        });
        expect(country.cca3).to.equal("ARG");
        expect(country.name).to.equal("Argentina");
        expect(country.flags).to.equal("string");
        expect(country.continents[0]).to.equal("LATAM");
        expect(country.capital[0]).to.equal("Buenos Aires");
      });
    });
  });
});
