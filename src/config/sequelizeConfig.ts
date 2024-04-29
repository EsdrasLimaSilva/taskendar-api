import { Sequelize } from "sequelize";

export const configureSequelize = (uri: string) => {
    return new Sequelize(uri);
};
