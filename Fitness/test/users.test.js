
// //let chai = require('chai')
// //let chaiHttp = require('chai-http');
//  let expect = require ( 'chai' ).expect;
//  let request = require ( 'request' );
  //let app = require ('../app')

//I wanted to test the status code of a request but I could not get the test to pass.
//unit test to check if  http://localhost:8080/admin request pass or fail

let expect = require ( 'chai' ).expect;
let request = require ( 'request' );

describe( 'Status ' , function () {
    describe ( 'Admin page' , function () {
        it( 'status error on incorrect port' , function (done){
            request( 'http://localhost:3000/admin' ,
                function (error, response, body) {
                    expect(response.statusCode).to.equal( 404 );
                done();
            });
        });

        it( 'status 200 on correct port' , function (done){
            request.post( 'http://localhost:8080/admin' ,
                function (error, response, body) {
                    expect(response.statusCode).to.equal( 200 );
                done();
            });
        });
});
});





