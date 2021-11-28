export const JwtConfig = {
	secret: process.env.JWT_SECRET || "5ebe2a474f3a6",
	expiresIn: "180s",
};