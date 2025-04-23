// import { auth, currentUser } from "@clerk/nextjs/server";
// import prisma from "./prisma";

// const Role = {
//   USER: "USER",
//   ADMIN: "ADMIN",
//   SUPER_ADMIN: "SUPER_ADMIN",
// } as const;

// type Role = typeof Role[keyof typeof Role];

// export async function getCurrentUserWithRole() {
//   const { userId } = await auth();
//   if (!userId) return null;

//   const clerkUser = await currentUser();
//   if (!clerkUser) return null;

//   // Get or create user in our database
//   const user = await prisma.user.upsert({
//     where: { id: userId },
//     update: { email: clerkUser.emailAddresses[0].emailAddress },
//     create: {
//       id: userId,
//       email: clerkUser.emailAddresses[0].emailAddress,
//       role: Role.USER,
//     },
//   });

//   return user;
// }

// export async function isAdmin() {
//   const user = await getCurrentUserWithRole();
//   return user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN;
// }

// export async function isSuperAdmin() {
//   const user = await getCurrentUserWithRole();
//   return user?.role === Role.SUPER_ADMIN;
// }

// export async function requireAdmin() {
//   const isUserAdmin = await isAdmin();
//   if (!isUserAdmin) {
//     throw new Error("Unauthorized: Admin access required");
//   }
// } 