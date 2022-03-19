describe('Countries Page Test', () => {
  let totalCountries: number;
  let borderCountry: string;

  it('Should display header title ', () => {
    cy.visit('/')
    cy.get('[data-test=app-title]')
      .should('contain.text', 'Where in the world?');
  })

  it('Should display loader  ', () => {
    cy.get('[data-test=loader]')
      .should('have.class', 'loader');
  })

  it('Should display list of countries from api call', () => {
    cy.intercept('GET', 'https://restcountries.com/v3.1/all').as('getCountries')
    cy.visit('/')
    cy.wait(['@getCountries']).then(
      (request: any) => {
        cy.get('[data-test=country-link]').then(countriesAnchorLink => {
          totalCountries = countriesAnchorLink.length
          expect(countriesAnchorLink.length).equal(request['response'].body.length);
        })
      })
  });

  it('Should display dark mode button ', () => {
    cy.get('[data-test=app-button]')
      .should('contain.text', 'Dark Mode');
  })

  it('Should change theme when dark mode button is clicked', () => {
    cy.wait(2000);
    cy.get('[data-test=app-button]')
      .click().then(() => {
        cy.get('body').should('have.class', 'dark-theme')
      })
  })

  it('Should have a search input', () => {
    cy.get('[data-test=country-search]').then((el) => {
      expect(el[0].nodeName).equal('INPUT');
    })
  })

  it('Should have a filter dropdown', () => {
    cy.get('[data-test=country-filter]').then((el) => {
      expect(el[0].nodeName).equal('MAT-SELECT');
    })
  })

  it('Should search for country when user types in search input', () => {
    cy.intercept('GET', 'https://restcountries.com/v3.1/name/moldova').as('getCountry')

    cy.get('[data-test=country-search]').type("Moldova", { force: true })

    cy.wait(['@getCountry']).then(
      (request: any) => {
        cy.get('[data-test=country-name]').should('contain.text', request.response.body[0].name.common)
      })


  })

  it('Should return cached response of all countries when user clears input', () => {
    cy.get('[data-test=country-search]').clear({ force: true })
    cy.get('[data-test=country-link]').then(countriesAnchorLink => {
      expect(countriesAnchorLink.length).equal(totalCountries);
    })
  })

  it('Should filter by region', () => {
    cy.intercept('GET', 'https://restcountries.com/v3.1/region/Africa').as('filterByRegion')

    cy.get('mat-select[data-test=country-filter]').click({ force: true }).get('mat-option').contains('Africa').click({ force: true });

    cy.wait(['@filterByRegion']).then(
      () => {
        cy.contains('Spain').should('not.exist')
      })

  })


  it('Should return cached response of all countries when user selects all', () => {

    cy.get('mat-select[data-test=country-filter]').click({ force: true }).get('mat-option').contains('All').click({ force: true })
    cy.get('[data-test=country-link]').then(countriesAnchorLink => {
      expect(countriesAnchorLink.length).equal(totalCountries);
    })

  })


  it('Should return cached response when user searches country that was searched before', () => {

    cy.get('[data-test=country-search]').type("Moldova", { force: true })
    cy.get('[data-test=country-name]').should('contain.text', "Moldova")

  })

  it('Should route to country details page when user clicks card', () => {

    cy.get('[data-test=country-link]').click({ force: true })
    cy.location().should((loc) => {
      expect(loc.href).to.include('/Moldova')
    })

  })

  it('Should route back to countries page when', () => {
    cy.get('[data-test=title-route]').click({ force: true })
    cy.get('[data-test=country-search]').then((el) => {
      expect(el[0].nodeName).equal('INPUT');
    })
  })


  it('Should have breadcrumb of visited country', () => {
    cy.get('[data-test=breadcrumb-link]').should('contain.text', 'Moldova')
  })

  it('Should route to cached details page when breadcrumb is clicked', () => {
    cy.get('[data-test=breadcrumb-link]')
      .click({ force: true })
    cy.location().should((loc) => {

      expect(loc.href).to.include('/Moldova')

    })
    cy.get('[data-test=country-name]').should('contain.text', "Moldova")

  })

  it('Should get country from api call when card is clicked, and get border countries right after.', () => {
    cy.intercept('GET', 'https://restcountries.com/v3.1/name/Gambia?fullText=true').as('getCountry')

    cy.get('[data-test=title-route]').click({ force: true })
    cy.get('[data-test=country-search]').type("Gambia", { force: true })
    cy.get('[data-test=country-link]').click({ force: true })

    cy.intercept('GET', `https://restcountries.com/v3.1/alpha?codes=SEN`).as('getBorderCountries')


    cy.wait(['@getCountry']).then(
      (request: any) => {


        cy.get('[data-test=country-name]').should('contain.text', request.response.body[0].name.common)
        cy.get('[data-test="country-flag"]').should('have.attr', 'src').should('include', request.response.body[0]?.flags?.svg)
        cy.wait(['@getBorderCountries']).then(
          (request: any) => {
            borderCountry = request.response.body[0].name.common
            cy.get('[data-test="border-countries"]').should('contain.text', request.response.body[0].name.common)
          })
      })

  })

  it('Should route to border country details page a border country is clicked', () => {

    cy.get('[data-test="border-countries"]')
      .click({ force: true })
    cy.location().should((loc) => {
      expect(loc.href).to.include(`/${borderCountry}`)
    })
    cy.wait(2000);
    cy.get('[data-test=title-route]').click({ force: true })

  })

  it('Should change theme when dark mode button is clicked again', () => {
    cy.wait(2000);
    cy.get('[data-test=app-button]')
      .click().then(() => {
        cy.get('body').should('have.class', 'light-theme')
      })
  })

  it('Should have 1 moon icon at an instance', () => {
    cy.get('[data-test=moon-icon]').then((el) => {
      expect(el.length).equal(1)
    })

  })
})

