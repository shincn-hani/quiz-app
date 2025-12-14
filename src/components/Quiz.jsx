import { useState } from "react";
import Result from "./Result";

const quizData = [
    {
        question: "Từ 「顕著」 có cách đọc đúng là gì?",
        options: ["けんちょ", "げんちょ", "けんじょ", "げんじょ"],
        answer: "けんちょ",
    },
    {
        question: "「措置を講じる」 có nghĩa gần nhất là gì?",
        options: [
            "Đưa ra lời giải thích",
            "Thực hiện biện pháp",
            "Tránh né trách nhiệm",
            "Phản đối quyết định"
        ],
        answer: "Thực hiện biện pháp",
    },
    {
        question: "Cách đọc đúng của 「憂慮」 là gì?",
        options: ["ゆうりょ", "ゆりょ", "ゆうろ", "ゆろ"],
        answer: "ゆうりょ",
    },
    {
        question: "「打開策」 có nghĩa là gì?",
        options: [
            "Kế hoạch dài hạn",
            "Biện pháp giải quyết bế tắc",
            "Ý kiến cá nhân",
            "Quy định nội bộ"
        ],
        answer: "Biện pháp giải quyết bế tắc",
    },
    {
        question: "Hán tự 「脆弱」 mang nghĩa gì?",
        options: [
            "Bền vững",
            "Yếu ớt, dễ vỡ",
            "Ổn định",
            "Linh hoạt"
        ],
        answer: "Yếu ớt, dễ vỡ",
    },
    {
        question: "Cách đọc đúng của 「免れる」 là gì?",
        options: ["まぬがれる", "まぬれる", "めんれる", "のがれる"],
        answer: "まぬがれる",
    },
    {
        question: "「看過できない」 có nghĩa là gì?",
        options: [
            "Có thể bỏ qua",
            "Không thể làm ngơ",
            "Đã được kiểm tra",
            "Khó nhận ra"
        ],
        answer: "Không thể làm ngơ",
    },
    {
        question: "Từ nào đồng nghĩa gần nhất với 「露呈」?",
        options: ["隠蔽", "発覚", "否認", "黙認"],
        answer: "発覚",
    },
    {
        question: "Cách đọc đúng của 「錯覚」 là gì?",
        options: ["さっかく", "さくかく", "そうかく", "しゃっかく"],
        answer: "さっかく",
    },
    {
        question: "「紛糾する」 thường được dùng trong ngữ cảnh nào?",
        options: [
            "Cuộc thảo luận trở nên rối ren",
            "Kế hoạch diễn ra suôn sẻ",
            "Mọi người đạt được đồng thuận",
            "Công việc hoàn tất"
        ],
        answer: "Cuộc thảo luận trở nên rối ren",
    },
    {
        question: "Hán tự 「示唆」 có nghĩa là gì?",
        options: [
            "Ra lệnh trực tiếp",
            "Gợi ý gián tiếp",
            "Cấm đoán",
            "Bác bỏ"
        ],
        answer: "Gợi ý gián tiếp",
    },
    {
        question: "Cách đọc đúng của 「収拾がつかない」 là gì?",
        options: [
            "Không thể thu xếp",
            "Không thể thu tiền",
            "Không thể sửa lỗi",
            "Không thể xác nhận"
        ],
        answer: "Không thể thu xếp",
    }
];


const Quiz = () => {
    const [optionSelected, setOptionSelected] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showResult, setShowResult] = useState(false);
    const [rightAnswers, setRightAnswers] = useState(0);
    const [userAnswers, setUserAnswers] = useState(
        Array.from({ length: quizData.length })
    );
    const handleClickOption = (option, index) => {
        setOptionSelected(option);

        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = index;
        setUserAnswers(updatedAnswers);

        const correctAnswer = quizData[currentQuestion].answer;
        if (option === correctAnswer) {
            setRightAnswers((prev) => prev + 1);
        }
    }
    const goNext = () => {
        if (currentQuestion === quizData.length - 1) {
            setShowResult(true);
        } else {
            setCurrentQuestion((prev) => prev + 1);
            const answered = userAnswers[currentQuestion + 1];
            setOptionSelected(
                answered !== undefined ? quizData[currentQuestion + 1].options[answered] : undefined
            );
        }
    }
    const goPrev = () => {
        setCurrentQuestion((prev) => prev - 1);
        const answered = userAnswers[currentQuestion - 1];
        setOptionSelected(
            answered !== undefined ? quizData[currentQuestion - 1].options[answered] : undefined
        );
    }

    if (showResult) {
        return (
            <Result
                quizData={quizData}
                userAnswers={userAnswers}
                onRestart={() => {
                    setShowResult(false);
                    setCurrentQuestion(1);
                    setOptionSelected("");
                    setUserAnswers(Array.from({ length: quizData.length }));
                }}
            />
        );
    }

    return (
        <div>
            <p className="question">Câu {currentQuestion}: {quizData[currentQuestion].question}</p>
            {quizData[currentQuestion].options.map((option, index) => (
                <button
                    id={`q1o${index}`}
                    key={option}
                    name="question1"
                    className={`option ${optionSelected === option ? 'selected' : ''}`}
                    disabled={!!optionSelected && optionSelected !== option}
                    value={option} onClick={() => handleClickOption(option, index)}>{option}</button>
            ))}

            {
                optionSelected ? optionSelected === quizData[currentQuestion].answer ? (
                    <p className="correct-answer">Correct answer!</p>
                ) : (
                    <p className="incorrect-answer">Wrong answer!</p>
                ) : ("")
            }

            <div className="nav-buttons">
                <button id="prevBtn" onClick={goPrev} disabled={currentQuestion === 1}>Previous</button>
                <button id="nextBtn"
                    onClick={goNext}>
                    {currentQuestion === quizData.length - 1 ? "Finish" : "Next"}
                </button>

            </div>
        </div>
    )
}

export default Quiz
