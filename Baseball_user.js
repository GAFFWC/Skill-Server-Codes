module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        "user",
        {
            userId: {
                field: "user_id",
                type: DataTypes.STRING,
                allowNull: false
            },
            botChoice: {
                field: "bot_choice",
                comment: "봇 숫자",
                type: DataTypes.STRING(4),
                allowNull: false
            },
            userRecord: {
                field: "user_record",
                comment: "유저 게임 기록",
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            "tableName": "user_table"
        }
    );
    return user;
};
