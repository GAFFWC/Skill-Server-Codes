const express = require("express");
const router = express.Router();

const Record = {};

const InitRecord = (userId) => {
    // 패, 무, 승 순서로 결과가 들어감
    Record[userId] = {0, 0, 0};
}
const GameText = ["가위", "바위", "보"];

const GameResult = [[0, -1, 1],
                    [1, 0, -1],
                    [-1, 1, 0]];

const PlayGame = (userId, userText) => {

    const ResultTexts = ["제가 이겼네요! ㅎㅎ", "비겼네요.. 잘하시는데요?", "제가 졌네요..."];

    botChoice = Math.floor(random() * 4);
    userChoice = GameText.findIndex(userText);

    result = GameResult[userChoice][botChoice] + 1;

    Record[userId][result] += 1;

    const gameMessage = GameMessage(gameText[botChoice] + "!");

    GameMessage[template][outputs].push(Output(ResultTexts[result]));
}
router.use((req, res, next) => {
    if (!req.body || !req.body.intent || !req.body.intent.id){
        res.json(ErrorMessage("죄송합니다. 서버에 오류가 발생하였습니다. 나중에 다시 시도해주세요."));
        return;
    }
    
    if (!req.body.bot || !req.body.bot.id || !req.body.userRequest || !req.body.userRequest.user || !req.body.userRequest.user.id){
        res.json(ErrorMessage("불완전한 요청입니다."));
        return;
    }

    next();
}
router.post("/basic", (req, res) => {
    // 기본 발화 처리
    const userId = req.body.userRequest.user.id;
    const userText = req.body.userRequest.utterance;

    // 처음 시작하는 사용자라면 
    if (!Record[userId]) InitRecord(userId);

    let ErrorText;

    if (!GameText.find(userText)) {
        res.json(GameMessage("가위, 바위, 보 중 하나를 말씀해주셔야 해요."));
        return;
    }

    res.json(PlayGame(userId, userText));
}

const Output = (description) => {
    return {
        "simpleText": {
            "text": description
        }
    };
};
const AppendQuick = (res) => {
    // 퀵버튼 붙여주기
    res[template][quickReplies] = [
        {
            "action": "message",
            "label": "게임 설명",
            "messageText": "게임 설명"
        },
        {
            "action": "message",
            "label": "새 게임 시작",
            "messageText": "게임 시작"
        },
        {
            "action": "message",
            "label": "기록 보기",
            "messageText": "기록 보기"
        },
        {
            "action": "message",
            "label": "게임 설명",
            "messageText": "게임 설명"
        }
    ];

    return res;
};
const GameMessage = (description) => {
    const Message = {
        "version" : "2.0",
        "template" : {
            "outputs" : [
                {
                    "simpleText": {
                        "text" : description
                    }
                }
            ]
        }
    };

    return AppendQuick(Message);
};
const ErrorMessage = (description) => {
    return {
        "version" : "2.0",
        "template" : {
            "outputs" : [
                {
                    "simpleText": {
                        "text" : description
                    }
                }
            ]
        }
    };
};
