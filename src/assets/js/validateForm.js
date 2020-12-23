/**
 * @module ValidateForm 表单验证
 * @param {}
 * @returns {}
 * @author : DCanmera
 * @since : 创建时间  2020-11-26 10:01:27
 * */

class ValidateForm {
  constructor() {

  }

  // 校正信息
  validate(data) {
    for (let key in data) {
      if (!data[key].reg.test(data[key].value)) {

        //表单验证不通过
        return { bool: false, msg: data[key].errorMsg };
      }
    }

    //表单验证通过
    return { bool: true };
  }
}


export const validateForm = new ValidateForm();
