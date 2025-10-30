import fs from "fs/promises";
import { Page } from "@playwright/test";
import { parse } from "csv-parse/sync";
import fsp from "fs";

export class Common {
  public static async checkFileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Drag a slider handle to a target value (percentage between min and max).
   * Returns the final handle position as a rounded percent (0-100) of the track width.
   */
  public static async dragSlider(
    page: Page,
    trackSelector: string,
    handleSelector: string,
    targetValue: number,
    min = 0,
    max = 100
  ): Promise<number> {
    const slider = page.locator(trackSelector);
    await slider.waitFor({ state: "visible", timeout: 5000 });

    const box = await slider.boundingBox();
    if (!box) throw new Error("Slider track not visible");

    const ratio = (targetValue - min) / (max - min);
    const targetX = box.x + ratio * box.width;
    const centerY = box.y + box.height / 2;

    const handle = slider.locator(handleSelector);
    const handleBox = await handle.boundingBox();
    if (handleBox) {
      await page.mouse.move(
        handleBox.x + handleBox.width / 2,
        handleBox.y + handleBox.height / 2
      );
    } else {
      await page.mouse.move(box.x + 1, centerY);
    }

    await page.mouse.down();
    await page.mouse.move(targetX, centerY, { steps: 12 });
    await page.mouse.up();

    await page.waitForTimeout(250);

    const percent = await page.evaluate(
      ([trackSel, handleSel]) => {
        const track = document.querySelector(trackSel) as HTMLElement;
        const handleEl = track?.querySelector(handleSel) as HTMLElement;
        if (!track || !handleEl) return -1;
        const left = parseFloat(window.getComputedStyle(handleEl).left || "0");
        const width = track.offsetWidth || 1;
        return Math.round((left / width) * 100);
      },
      [trackSelector, handleSelector]
    );

    return percent;
  }

  public static async readCsv(filePath: string): Promise<any> {
    const content = fsp.readFileSync(filePath, "utf-8");
    const records = parse(content, {
      columns: true, // use first row as headers
      skip_empty_lines: true,
    });
    return records;
  }
}
