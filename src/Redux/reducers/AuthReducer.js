import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FETCHPROFILESUCCESS,
  REGISTER_ATTEM,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  Update_Profile_Attemp,
  Update_Profile_Success,
  Update_Profile_Fail,
  Login_Type,
  Set_notification_Token,
  ChangePasswordAteemp,
  ChangePasswordSuccess,
  ChangePasswordFail,
  GetMyPalanceSuccess,
  GetMyPalanceAttemp,
  GetMyPalanceFail,
  Verifyphoe_ATTEM,
  Verifyphoe_FAIL,
  Verifyphoe_SUCCESS
} from "../types";

const INITIAL_STATE = {
  LoginType: "customer",
  user: null,
  error: {},
  errorRegister:{},
  errorUpdate: {},
  message: "",
  isClient: true,
  loginLoading: false,
  registerLoading: false,
  VerfiyPhoneLoading: false,
  UpdateProfileLoading: false,
  token: null,
  chagePasswordLoading: false,
  changePasswordSuccess: false,
  changePasswordError: "",
  balance: 0,
  balanceLoding: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Set_notification_Token: {
      return {
        ...state,
        token: action.payload
      };
    }
    case Login_Type: {
      return {
        ...state,
        LoginType: action.payload
      };
    }
    case LOGIN_ATTEMPT:
      return {
        ...state,
        user: null,
        loginLoading: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        user: null,
        loginLoading: false,
        registerLoading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        registerLoading: false,
        user: action.payload
      };
    case REGISTER_ATTEM:
      return {
        ...state,
        user: null,
        registerLoading: true,
        token: null
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        loginLoading: false,
        registerLoading: false,
        errorRegister:action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        registerLoading: false,
        user: action.payload,
        errorRegister:{},
      };

    case Verifyphoe_ATTEM:
      return {
        ...state,
        user: null,
        VerfiyPhoneLoading: true,
        token: null
      };
    case Verifyphoe_FAIL:
      return {
        ...state,
        user: null,
        VerfiyPhoneLoading: false,
        loginLoading: false,
        registerLoading: false
      };
    case Verifyphoe_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        registerLoading: false,
        VerfiyPhoneLoading: false
      };

    case Update_Profile_Attemp:
      return {
        ...state,
        UpdateProfileLoading: true,
        errorUpdate:{},
      };
    case Update_Profile_Fail:
      return {
        ...state,
        UpdateProfileLoading: false,
        errorUpdate: action.payload,
      };
    case Update_Profile_Success:
      return {
        ...state,
        UpdateProfileLoading: false,
        user: action.payload,
        errorUpdate:{},
      };

    case FETCHPROFILESUCCESS:
      return {
        ...state,
        profile: action.payload
      };
    case "resetload":
      return {
        ...state,
        registerLoading: false,
        loginLoading: false,
        VerfiyPhoneLoading: false
      };
    case "isClient":
      return {
        ...INITIAL_STATE,
        isClient: action.payload
      };
    case "logout":
      return {
        ...INITIAL_STATE
      };
    case ChangePasswordAteemp:
      return {
        ...state,
        chagePasswordLoading: false,
        changePasswordSuccess: false,
        changePasswordError: ""
      };
    case ChangePasswordSuccess:
      return {
        ...state,
        chagePasswordLoading: false,
        changePasswordSuccess: true,
        changePasswordError: ""
      };
    case ChangePasswordFail:
      return {
        ...state,
        chagePasswordLoading: false,
        changePasswordSuccess: false,
        changePasswordError: action.payload
      };
    case GetMyPalanceAttemp:
      return {
        ...state,

        balanceLoding: true
      };
    case GetMyPalanceFail:
      return {
        ...state,

        balanceLoding: false
      };
    case GetMyPalanceSuccess:
      return {
        ...state,
        balance: action.payload,
        balanceLoding: false
      };

    default:
      return state;
  }
};
