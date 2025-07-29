"use server";

import firestore from "@/lib/firestore";

export async function createGame() {
  const gameRef = firestore.collection("games").doc();
  await gameRef.set({
    name: "test",
    createdAt: new Date().toISOString(),
  });
  return gameRef.id;
}
