import { jest } from "@jest/globals";

// ESM mocking for got-scraping
jest.unstable_mockModule("got-scraping", () => ({
  gotScraping: jest.fn(),
}));

// Dynamic imports after mocking
const { gotScraping } = await import("got-scraping");
const { scrapeEvents, scrapeEventDetails } = await import(
  "../services/scrapperService.js"
);

const mockEventsHtml = `
<div class="fightcenterEvents">
  <div>
    <div class="promotion">
      <a href="/fightcenter/events/123">UFC 300: Main Event</a>
      <span></span><span></span><span></span><span>2025-05-01</span>
    </div>
  </div>
  <div>
    <div class="promotion">
      <a href="/fightcenter/events/456">Bellator 200</a>
      <span></span><span></span><span></span><span>2025-06-01</span>
    </div>
  </div>
</div>
`;

const mockEventDetailsHtml = `
<ul class="mt-5" data-event-view-toggle-target="list">
  <li>
    <a class="hover:border-solid hover:border-b hover:border-neutral-950 hover:text-neutral-950">Main Event</a>
    <span class="px-1.5 md:px-1 leading-[23px] text-sm md:text-[13px] text-neutral-50 rounded">205</span>
    <div class="div flex flex-row gap-0.5 md:gap-0 w-full">
      <a class="link-primary-red" href="/fightcenter/fighters/117305-alex-pereira">Alex Pereira</a>
      <span class="text-[15px] md:text-xs order-2">10-2</span>
      <img class="opacity-70 h-[14px] md:h-[11px] w-[22px] md:w-[17px]" src="/flags/br.gif">
      <img class="w-[77px] h-[77px] md:w-[104px] md:h-[104px] rounded" src="https://images.tapology.com/headshot_images/117305/preview/Screenshot_%281%29.png">
    </div>
    <div class="div flex flex-row gap-0.5 md:gap-0 w-full">
      <a class="link-primary-red" href="/fightcenter/fighters/120815-jamahal-hill">Jamahal Hill</a>
      <span class="text-[15px] md:text-xs order-1">12-2</span>
      <img class="opacity-70 h-[14px] md:h-[11px] w-[22px] md:w-[17px]" src="/flags/us.gif">
      <img class="w-[77px] h-[77px] md:w-[104px] md:h-[104px] rounded" src="https://images.tapology.com/headshot_images/120815/preview/47263906db33404c84bc36261998b458.jpg">
    </div>
  </li>
</ul>
`;

describe("scrapperService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("scrapeEvents", () => {
    it("should return parsed events for major orgs", async () => {
      gotScraping.mockResolvedValueOnce({
        statusCode: 200,
        body: mockEventsHtml,
      });
      const events = await scrapeEvents();
      expect(events).toEqual([
        {
          title: "UFC 300: Main Event",
          date: "2025-05-01",
          link: "https://www.tapology.com/fightcenter/events/123",
        },
        {
          title: "Bellator 200",
          date: "2025-06-01",
          link: "https://www.tapology.com/fightcenter/events/456",
        },
      ]);
    });

    it("should throw error if status code is not 200", async () => {
      gotScraping.mockResolvedValueOnce({ statusCode: 500, body: "" });
      await expect(scrapeEvents()).rejects.toThrow(
        "Failed to scrape data from Tapology"
      );
    });
  });

  describe("scrapeEventDetails", () => {
    it("should return events with fight details", async () => {
      gotScraping.mockResolvedValueOnce({
        statusCode: 200,
        body: mockEventDetailsHtml,
      });
      const events = [
        {
          title: "UFC 300: Main Event",
          date: "2025-05-01",
          link: "https://www.tapology.com/fightcenter/events/123",
        },
      ];
      const result = await scrapeEventDetails(events);
      const fight = result[0].fights[0];
      expect(fight.main).toBe(true);
      expect(fight.weight).toBe("205");
      expect(fight.fighterA.name).toBe("Alex Pereira");
      expect(fight.fighterB.name).toBe("Jamahal Hill");
      expect(fight.fighterA.country).toContain("/flags/br.gif");
      expect(fight.fighterB.country).toContain("/flags/us.gif");
    });

    it("should throw error if gotScraping fails", async () => {
      gotScraping.mockRejectedValueOnce(new Error("Network error"));
      const events = [
        {
          title: "UFC 300: Main Event",
          date: "2025-05-01",
          link: "https://www.tapology.com/fightcenter/events/123",
        },
      ];
      await expect(scrapeEventDetails(events)).rejects.toThrow(
        "Error during scraping"
      );
    });
  });
});
