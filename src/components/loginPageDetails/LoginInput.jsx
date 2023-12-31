import React, { useEffect } from "react";
import { BsFingerprint, BsPersonCircle } from "react-icons/bs";
import { styled } from "styled-components";
import { Btn } from "../homecontent/homeLogin";
import { useNavigate } from "react-router-dom";
import useBasicHook from "../../store/inputAuth";
import { useDispatch, useSelector } from "react-redux";
import { EventSliceAction } from "../../store/EventStore";

function LoginInput() {
  const userExist = useSelector((store) => store.event.userCanLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textCheck = (value) => value.trim() !== "";

  useEffect(() => {
    if (userExist) {
      GoToNextPage();
    }
  }, [userExist, navigate]);

  function GoToNextPage() {
    navigate("/logedIn");
  }

  const {
    IsTouched: _accountNumberIsTouched,
    IsTouchedFn: _accountNumberIsTouchedFn,
    IsValid: _accountInputIsValid,
    hasError: _accountInputHasError,
    onChangeHandeler: _accountInputOnChangeHandelerFn,
    value: _accountNumberValue,
    resetFn: accountNumberReset,
  } = useBasicHook(textCheck);

  const {
    IsTouched: _passwordIsTouched,
    IsTouchedFn: _passwordIsTouchedFn,
    IsValid: _PasswordIsValid,
    hasError: _PasswordHasError,
    onChangeHandeler: _PasswordOnChangeHandelerFn,
    value: _passwordValue,
    resetFn: paswordRest,
  } = useBasicHook(textCheck);

  const liginIsValid = _accountInputIsValid && _PasswordIsValid;

  console.log(_accountNumberIsTouched);

  function onLogUserInHandelerFn() {
    paswordRest();
    accountNumberReset();
    if (!liginIsValid) {
      paswordRest();
      accountNumberReset();
      return;
    }
    dispatch(
      EventSliceAction.onLogUserHandelerFn({
        password: +_passwordValue,
        accountNumber: +_accountNumberValue,
      })
    );

    paswordRest();
    accountNumberReset();
  }

  return (
    <BottomContainer>
      <LabelWrapper>
        <label>Account No:</label>
        <InputWrapper>
          <BsPersonCircle className="icon" />
          <CustomInput
            type="text"
            pattern="[0-9]*"
            placeholder="Acount number"
            value={_accountNumberValue}
            onChange={_accountInputOnChangeHandelerFn}
            onBlur={_accountNumberIsTouchedFn}
          />
        </InputWrapper>
      </LabelWrapper>
      <LabelWrapper>
        <label>Password:</label>
        <InputWrapper>
          <BsFingerprint className="icon" />
          <CustomInput
            type="text"
            pattern="[0-9]*"
            placeholder="1234567890"
            value={_passwordValue}
            onChange={_PasswordOnChangeHandelerFn}
            onBlur={_passwordIsTouchedFn}
          />
        </InputWrapper>
      </LabelWrapper>
      <LastDiv>
        <CheckBox>
          <input type="checkbox" />
          <label>Remember me</label>
        </CheckBox>
        <Btn onClick={onLogUserInHandelerFn}>Login</Btn>
      </LastDiv>
      <p>Forgotten password ?</p>
    </BottomContainer>
  );
}

export default LoginInput;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  & p {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 90%;

  & label {
    font-size: large;
    color: #3e3c3c;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    margin-left: 50px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;

  & .icon {
    width: 40px;
    height: 40px;
    color: #047bf8;
  }
`;

const CustomInput = styled.input`
  outline: none;
  background-color: transparent;
  border-radius: 3px;
  height: 30px;
  width: 80%;
  border: 2px solid #dde2ec;
  background-clip: padding-box;
  color: #495057;
  padding: 0.375rem 0.75rem;

  .no-spinner::-webkit-inner-spin-button,
  .no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & .error {
    background-color: red;
  }

  & :focus {
    outline: none;
  }
`;

const LastDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 75%;
  padding: 10px;
  box-sizing: border-box;
  border-top: 1px solid gray;
  justify-content: space-between;
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Avenir Next W01", "Proxima Nova W01", "Rubik", -apple-system,
    system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  color: #3e4b5b;
`;
