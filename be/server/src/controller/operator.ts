import OperatorModel from '../interface/OperatorModel';

const Operator: OperatorModel = class {
  public static login(): void {
    console.log('login');
  }

  public static logout(): void {
    console.log('logout');
  }
};

export default Operator;
