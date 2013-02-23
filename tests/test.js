var should = require("should")
    , routes = require("../routes")
    , xml2json = require('../routes/xml2json');

var index = {
        request: {
            headers: {
                host: 'jaxapp.example'
            }
        }, 
        response: {
            viewName: ""
            , data : {}
            , render: function(view, viewData) {
                this.viewName = view;
                this.data = viewData;
            } 
        }
    },
    convert = {
        request: {
            query: {
                xml: "http://jaxapp.herokuapp.com/samples/test-results.xml"
            }
        },
        response: {
            setHeader: function (name, value) {
                return true;
            },
            data: {

            }
        }
    },
    testResults = {

    };


describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the index view name", function(){
            routes.index(index.request, index.response);
            index.response.viewName.should.equal("index");
        });

    });

});

describe("Conversion", function () {
    describe("JSON conversion", function () {
        it("should provide an equal JSON representation", function () {
            xml2json.convert(convert.request, convert.response);
            convert.response.data.should.eql(testResults);
        });
    });
});