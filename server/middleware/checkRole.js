
const checkRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userRole = req.user?.role;

            if (!userRole) {
                return res.status(401).json({ message: "User role not found" });
            }

            if (!allowedRoles.map(r => r.toLowerCase()).includes(userRole.toLowerCase())) {
                return res.status(403).json({ message: "Not authorized" });
            }




            next();

        } catch (error) {
            return res.status(500).json({ message: error.message });

        }

    }

}

export default checkRole;