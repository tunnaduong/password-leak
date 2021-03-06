/* global describe, it */

require('jsdom-global')()

const chai = require('chai')

chai.use(require('chai-as-promised'))
chai.should()

const isPasswordCompromised = require('../dist')
const randomPassword = Math.random().toString(36).substr(2, 11)

describe('password-leak', () => {
  it('should throw error on undefined password', () => {
    return isPasswordCompromised().should.eventually.be.rejected
  })

  it('should throw error on empty password', () => {
    return isPasswordCompromised('').should.eventually.be.rejected
  })

  it('should report "test" as compromised', () => {
    return isPasswordCompromised('test').should.eventually.be.true
  })

  it(`should report "${randomPassword}" as not compromised`, () => {
    return isPasswordCompromised(randomPassword).should.eventually.be.false
  })
})
