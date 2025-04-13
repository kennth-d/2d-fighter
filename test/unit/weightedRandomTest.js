import { getWeightedRandom } from "../../src/scripts/utils/AiUtils.js";

export function testWeightedRandomChoice() {
    const options = [
        { action: "A", weight: 10 },
        { action: "B", weight: 30 },
        { action: "C", weight: 60 },
    ];

    const results = { A: 0, B: 0, C: 0 };
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
        const result = getWeightedRandom(options);
        if (results[result] !== undefined) {
            results[result]++;
        } else {
            console.error("Unexpected result:", result);
        }
    }

    console.log("Distribution over", iterations, "iterations:", results);

    const percentA = (results.A / iterations) * 100;
    const percentB = (results.B / iterations) * 100;
    const percentC = (results.C / iterations) * 100;

    console.assert(percentA > 5 && percentA < 15, "A is out of range");
    console.assert(percentB > 25 && percentB < 35, "B is out of range");
    console.assert(percentC > 55 && percentC < 65, "C is out of range");

    console.log("✅ weightedRandomChoice test passed.");
}

testWeightedRandomChoice();
