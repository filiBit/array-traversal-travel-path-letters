// @ts-nocheck
import { CrossroadRepository } from "./crossroad-repository.js";
import { DIRECTION } from "./position/direction.js";

afterEach(() => {
    CrossroadRepository.clear();
});

describe("Given all the gates are unlocked", () => {
    test("Then there are no locked gates", () => {
        expect(CrossroadRepository.lockedGates.size).toBe(0);
        expect(CrossroadRepository.isGateLocked([1, 2], DIRECTION.RIGHT)).toBe(false);
        expect(CrossroadRepository.isGateLocked([41, 5], DIRECTION.UP)).toBe(false);
    });

    describe("When a gate gets locked", () => {
        test("Then the state is persisted correctly", () => {
            expect(CrossroadRepository.lockedGates.size).toBe(0);
            CrossroadRepository.lockGate([2, 3], DIRECTION.RIGHT);
            expect(CrossroadRepository.lockedGates.size).toBe(1);
            expect(CrossroadRepository.isGateLocked([2, 3], DIRECTION.RIGHT)).toBe(true);
            expect(CrossroadRepository.isGateLocked([2, 4], DIRECTION.LEFT)).toBe(true);
            expect(CrossroadRepository.isGateLocked([1, 2], DIRECTION.RIGHT)).toBe(false);
        });

        test("Then the state is persisted correctly", () => {
            expect(CrossroadRepository.lockedGates.size).toBe(0);
            CrossroadRepository.lockGate([10, 10], DIRECTION.DOWN);
            CrossroadRepository.lockGate([11, 10], DIRECTION.DOWN);
            CrossroadRepository.lockGate([20, 10], DIRECTION.LEFT);
            expect(CrossroadRepository.lockedGates.size).toBe(3);

            expect(CrossroadRepository.isGateLocked([10, 10], DIRECTION.DOWN)).toBe(true);
            expect(CrossroadRepository.isGateLocked([10, 10], DIRECTION.LEFT)).toBe(false);
            expect(CrossroadRepository.isGateLocked([10, 10], DIRECTION.RIGHT)).toBe(false);
            expect(CrossroadRepository.isGateLocked([10, 10], DIRECTION.UP)).toBe(false);

            expect(CrossroadRepository.isGateLocked([11, 10], DIRECTION.DOWN)).toBe(true);
            expect(CrossroadRepository.isGateLocked([11, 10], DIRECTION.UP)).toBe(true);
            expect(CrossroadRepository.isGateLocked([10, 9], DIRECTION.UP)).toBe(false);
            expect(CrossroadRepository.isGateLocked([12, 10], DIRECTION.DOWN)).toBe(false);
            expect(CrossroadRepository.isGateLocked([12, 10], DIRECTION.UP)).toBe(true);

            expect(CrossroadRepository.isGateLocked([20, 10], DIRECTION.LEFT)).toBe(true);
            expect(CrossroadRepository.isGateLocked([20, 9], DIRECTION.RIGHT)).toBe(true);
            expect(CrossroadRepository.isGateLocked([20, 10], DIRECTION.UP)).toBe(false);
        });
    });
});
