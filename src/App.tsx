import { styled, createGlobalStyle } from "styled-components";
import { useState, ChangeEvent, FormEvent } from "react";

const App: React.FC = () => {
  const dateOfTheMoment = new Date(Date.now());
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const [date, setDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });

  const [errors, setErrors] = useState({
    day: false,
    month: false,
    year: false,
  });

  function parseDaysToYMD(differenceInDays: number) {
    const daysInYear = 365;
    const daysInMonth = 30.34;

    const years = Math.floor(differenceInDays / daysInYear);
    differenceInDays -= years * daysInYear;

    const months = Math.floor(differenceInDays / daysInMonth);
    differenceInDays -= months * daysInMonth;

    const days = Math.floor(differenceInDays);

    return { years, months, days };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredDate = new Date(date.year, date.month - 1, date.day);
    const differenceInMillis =
      dateOfTheMoment.getTime() - enteredDate.getTime();
    const differenceInDays = Math.floor(
      differenceInMillis / (1000 * 60 * 60 * 24)
    );
    setResult(parseDaysToYMD(differenceInDays));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const parsedValue = parseInt(value);
    const errorState = {
      ...errors,
      [name]: false,
    };

    if (name === "day" && parsedValue > 31) {
      errorState.day = true;
    }

    if (name === "month" && parsedValue > 12) {
      errorState.month = true;
    }

    if (name === "year" && parsedValue > dateOfTheMoment.getFullYear()) {
      errorState.year = true;
    }

    setErrors(errorState);
    setDate((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  }

  return (
    <>
      <GlobalStyles />
      <MainDiv>
        <Form onSubmit={handleSubmit}>
          <InputAndTextDiv>
            <Desc>Day</Desc>
            <DateInput
              $error={errors.day}
              name="day"
              type="number"
              placeholder="DD"
              onChange={handleChange}
              max="31"
            />
          </InputAndTextDiv>
          <InputAndTextDiv>
            <Desc>Month</Desc>
            <DateInput
              $error={errors.month}
              name="month"
              type="number"
              placeholder="MM"
              onChange={handleChange}
              max="12"
            />
          </InputAndTextDiv>
          <InputAndTextDiv>
            <Desc>Year</Desc>
            <DateInput
              $error={errors.year}
              name="year"
              type="number"
              placeholder="YYYY"
              onChange={handleChange}
              max={dateOfTheMoment.getFullYear().toString()}
            />
          </InputAndTextDiv>
          <SubmitButton type="submit">Submit</SubmitButton>
          <TextDiv>
            <H1 $primary>{result ? result.years : "--"}</H1>
            <H1>years</H1>
          </TextDiv>
          <TextDiv>
            <H1 $primary>{result ? result.months : "--"}</H1>
            <H1>months</H1>
          </TextDiv>
          <TextDiv>
            <H1 $primary>{result ? result.days : "--"}</H1>
            <H1>days</H1>
          </TextDiv>
        </Form>
      </MainDiv>
    </>
  );
};
type H1Props = {
  $primary?: boolean;
};
type DateInputProps = {
  $error: boolean;
};
const SubmitButton = styled.button`
  display: block;
  position: absolute;
  right: 30px;
  height: 100px;
  width: 100px;
  background-color: black;
  border-radius: 50%;
  margin: 20px;
`;
const MainDiv = styled.div`
  margin-top: 30px;
  position: relative;
  background-color: #ffffff;
  padding: 30px 100px;
  border-radius: 20px;
  border-bottom-right-radius: 20%;
`;
const Form = styled.form``;
const TextDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
`;
const H1 = styled.h1<H1Props>`
  font-family: "Italic-bold";
  letter-spacing: 0px;
  line-height: 112px;
  color: ${(props) => (props.$primary ? "#854DFF" : "black")};
  display: inline-block;
  font-size: ${(props) => (props.$primary ? "150px" : "100px")};
  margin: 0px;
`;
const Desc = styled.p`
  font-family: "Poppins-Extrabold";
  font-size: 20px;
  margin-bottom: 10px;
`;
const InputAndTextDiv = styled.div`
  margin: 30px;
  display: inline-block;
`;
const DateInput = styled.input<DateInputProps>`
  transition: 0.6s;
  font-family: "Poppins-Extrabold";
  border: ${(props) => (props.$error ? "3px solid red" : "2px solid black")};
  color: ${(props) => (props.$error ? "red" : "black")};
  border-radius: 10px;
  padding: 10px;
  width: 150px;
  font-size: 2rem;
`;

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: "Poppins-Extrabold" ;
        src: url("../assets/fonts//Poppins-ExtraBold.ttf");
    }
    @font-face {
        font-family:"Italic-bold" ;
        src: url("../assets/fonts//Poppins-BoldItalic.ttf");
    }
    body{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F0F0F0;
    }
`;
export default App;
