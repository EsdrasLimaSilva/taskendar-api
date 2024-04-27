import "dotenv/config";
import { app } from "./app";

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

const publicKeys = [
    {
        kid: "key-id-1",
        alg: "RS256",
        kty: "RSA",
        n: "sample-n-value-1",
        e: "AQAB",
    },
    {
        kid: "key-id-2",
        alg: "RS256",
        kty: "RSA",
        n: "sample-n-value-2",
        e: "AQAB",
    },
];

app.get("/.well-known/jwks.json", (req, res) => {
    res.json({
        keys: publicKeys,
    });
});
