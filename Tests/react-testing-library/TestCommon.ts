import "jsdom-global/register";
import { should, use } from "chai";
import * as sinonChai from 'sinon-chai';
import { TestMiddleware } from "wattle";

should();
use(sinonChai);

class Middleware extends TestMiddleware { }

export default new Middleware();
