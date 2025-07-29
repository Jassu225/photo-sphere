import { NextRequest, NextResponse } from "next/server";
import { createRequestCache } from "fire-memoize/core"; // Import from the core module
import firestore from "@/lib/firestore";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  let cleanup: (() => void) | undefined;
  const userId = "test-user-uid";
  const collectionName = "games";

  try {
    // Initialize the request-scoped cache for this specific request
    cleanup = createRequestCache(firestore);

    const userDocRef = firestore.collection(collectionName).doc(userId);
    await userDocRef.set(
      {
        name: "test2",
        createdAt: new Date().toISOString(),
      },
      { merge: false }
    );

    // First read for the user document (will hit Firestore if not already cached by a query)
    console.log(
      `[GET /api/${collectionName}/${userId}] Attempting first read...`
    );
    const userSnapshot1 = await userDocRef.get();
    const userData1 = userSnapshot1.data();
    console.log(
      `[GET /api/${collectionName}/${userId}] First read data:`,
      userData1
    );

    // Subsequent read for the same user document within the same request (will hit cache)
    console.log(
      `[GET /api/${collectionName}/${userId}] Attempting second read...`
    );
    const userSnapshot2 = await userDocRef.get();
    const userData2 = userSnapshot2.data(); // This data comes from the in-request cache
    console.log(
      `[GET /api/${collectionName}/${userId}] Second read data (from cache):`,
      userData2
    );

    return NextResponse.json({
      message:
        "Firestore reads cached with fire-memoize in Next.js App Router.",
      userData: userData1,
    });
  } catch (error) {
    console.error("Error in Next.js App Router route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  } finally {
    // Crucially, clean up the cache at the end of the request
    if (cleanup) {
      cleanup();
      console.log(
        `[GET /api/${collectionName}/${userId}] fire-memoize cache cleaned up.`
      );
    }
  }
}
