// Curated press and newspaper resources merged into case files by js/data-loader.js.
// These entries prioritize original clippings, newspaper archives, and press-hosted retrospectives.
const NEWSPAPER_CASE_RESOURCES = {
    "nuremberg-phenomenon-1561": [
        {
            "type": "article",
            "title": "Public Domain Review: Celestial Phenomenon Over Nuremberg",
            "publication": "The Public Domain Review",
            "date": "2016-04-14",
            "url": "https://publicdomainreview.org/collection/celestial-phenomenon-over-nuremberg-april-14th-1561/"
        }
    ],
    "basel-phenomenon-1566": [
        {
            "type": "article",
            "title": "Swiss National Museum: The Celestial Event Over Basel in 1566",
            "publication": "Swiss National Museum",
            "date": "2024-07-29",
            "url": "https://blog.nationalmuseum.ch/en/2024/07/the-celestial-event-over-basel-in-1566/"
        }
    ],
    "airship-texas-1896": [
        {
            "type": "article",
            "title": "Aurora, TX: Great Airship and Aurora Crash History",
            "publication": "City of Aurora, Texas",
            "date": "2022",
            "url": "https://www.auroratexas.gov/community/history/"
        }
    ],
    "airship-california-1896": [
        {
            "type": "newspaper",
            "title": "San Francisco Call: Saw the Mystic Flying Light",
            "publication": "San Francisco Call",
            "date": "1896-11-22",
            "url": "https://cdnc.ucr.edu/?a=d&d=SFC18961122.2.165"
        },
        {
            "type": "newspaper",
            "title": "Newspapers.com: 1896 UFO Sighting, San Francisco Call",
            "publication": "San Francisco Call",
            "date": "1896-11-22",
            "url": "https://www.newspapers.com/article/the-san-francisco-call-bulletin-1896-ufo/38656678/"
        }
    ],
    "aurora-texas-crash-1897": [
        {
            "type": "article",
            "title": "Aurora, TX: Aurora History and Original Dallas Morning News Front Page",
            "publication": "City of Aurora, Texas",
            "date": "2022",
            "url": "https://www.auroratexas.gov/community/history/"
        }
    ],
    "fatima-miracle-1917": [
        {
            "type": "newspaper",
            "title": "O Seculo: How the Sun Danced at Noon in Fatima",
            "publication": "O Seculo",
            "date": "1917-10-15",
            "url": "https://livingfatima.com/2016/06/17/how-the-sun-danced-at-noon-in-fatima/"
        }
    ],
    "battle-la-1942": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Army Says Alarm Real",
            "publication": "Los Angeles Times",
            "date": "1942-02-26",
            "url": "https://www.newspapers.com/article/the-los-angeles-times-battle-of-los-ange/119137374/"
        }
    ],
    "foo-fighters-1944": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Foo Fighters",
            "publication": "Los Angeles Times",
            "date": "1945-01-02",
            "url": "https://www.newspapers.com/clip/121297928/foo-fighters-1945-01-02-the-los-angeles/"
        },
        {
            "type": "newspaper",
            "title": "The Mirror: Foo Fighter",
            "publication": "The Mirror",
            "date": "1945-06-29",
            "url": "https://trove.nla.gov.au/newspaper/article/75112804"
        }
    ],
    "foo-fighters-pacific-1945": [
        {
            "type": "newspaper",
            "title": "The Mirror: Foo Fighter",
            "publication": "The Mirror",
            "date": "1945-06-29",
            "url": "https://trove.nla.gov.au/newspaper/article/75112804"
        }
    ],
    "ghost-rockets-sweden-1946": [
        {
            "type": "newspaper",
            "title": "The San Bernardino County Sun: Ghost Rocket",
            "publication": "The San Bernardino County Sun",
            "date": "1946",
            "url": "https://www.newspapers.com/article/the-san-bernardino-county-sun-ghost-rock/2590458/"
        },
        {
            "type": "newspaper",
            "title": "Malaya Tribune: Ghost Rockets Over Sweden",
            "publication": "Malaya Tribune",
            "date": "1946-08-12",
            "url": "https://eresources.nlb.gov.sg/newspapers/digitised/issue/maltribune19460812-1"
        }
    ],
    "kenneth-arnold-1947": [
        {
            "type": "newspaper",
            "title": "Chicago Sun: Supersonic Flying Saucers Sighted by Idaho Pilot",
            "publication": "Chicago Sun",
            "date": "1947-06-26",
            "url": "https://commons.wikimedia.org/wiki/File:Chicago_Sun_1947-06-26-2_Flying_Saucer_headline-th.jpg"
        },
        {
            "type": "newspaper",
            "title": "Corvallis Gazette-Times: Mystery Missiles Seen Over Cascades",
            "publication": "Corvallis Gazette-Times",
            "date": "1947-06-26",
            "url": "https://www.newspapers.com/article/corvallis-gazette-times-1947-06-26-myst/144857091/"
        }
    ],
    "roswell-1947": [
        {
            "type": "newspaper",
            "title": "Roswell Daily Record: RAAF Captures Flying Saucer",
            "publication": "Roswell Daily Record",
            "date": "1947-07-08",
            "url": "https://en.wikisource.org/wiki/Roswell_Daily_Record/1947/RAAF_Captures_Flying_Saucer_on_Ranch_in_Roswell_Region"
        },
        {
            "type": "newspaper",
            "title": "Tulare Advance-Register: Original Roswell Press Release Coverage",
            "publication": "Tulare Advance-Register",
            "date": "1947-07-08",
            "url": "https://www.newspapers.com/article/tulare-advance-register-original-roswell/144007227/"
        }
    ],
    "mantell-1948": [
        {
            "type": "newspaper",
            "title": "Albuquerque Journal: Mantell UFO Retrospective",
            "publication": "Albuquerque Journal",
            "date": "1952-08-21",
            "url": "https://www.newspapers.com/article/albuquerque-journal-mantell-ufo-1952-08/115885938/"
        }
    ],
    "gorman-dogfight-1948": [
        {
            "type": "newspaper",
            "title": "Gorman UFO Dogfight News Clipping",
            "publication": "Newspapers.com",
            "date": "1948",
            "url": "https://www.newspapers.com/article/the-bismarck-tribune-gorman-ufo-dogfight/52328441/"
        }
    ],
    "chiles-whitted-1948": [
        {
            "type": "newspaper",
            "title": "Chiles-Whitted UFO Encounter News Clipping",
            "publication": "Newspapers.com",
            "date": "1948",
            "url": "https://www.newspapers.com/article/the-anniston-star-chiles-whitted-ufo/89591944/"
        }
    ],
    "green-fireballs-1948": [
        {
            "type": "article",
            "title": "HISTORY: Why Mysterious Green Fireballs Worried the US Government in 1948",
            "publication": "HISTORY",
            "date": "2018-08-17",
            "url": "https://www.history.com/articles/ufos-green-fireballs-nuclear-facilities-new-mexico"
        }
    ],
    "mariana-film-1950": [
        {
            "type": "article",
            "title": "Great Falls History Museum: Mariana UFO Incident",
            "publication": "Great Falls History Museum",
            "date": "2025",
            "url": "https://www.greatfallshistorymuseum.org/blog/the-mariana-ufo-great-falls-visiting-voyagers"
        },
        {
            "type": "article",
            "title": "Distinctly Montana: When UFOs First Came to Great Falls",
            "publication": "Distinctly Montana",
            "date": "2026",
            "url": "https://www.distinctlymontana.com/when-ufos-first-came-great-falls"
        }
    ],
    "mariana-ufo-film-1950": [
        {
            "type": "article",
            "title": "Great Falls History Museum: Mariana UFO Incident",
            "publication": "Great Falls History Museum",
            "date": "2025",
            "url": "https://www.greatfallshistorymuseum.org/blog/the-mariana-ufo-great-falls-visiting-voyagers"
        },
        {
            "type": "article",
            "title": "Distinctly Montana: When UFOs First Came to Great Falls",
            "publication": "Distinctly Montana",
            "date": "2026",
            "url": "https://www.distinctlymontana.com/when-ufos-first-came-great-falls"
        }
    ],
    "flight-105-ufo-1947": [
        {
            "type": "newspaper",
            "title": "The Oregonian: UFO Report by United Airlines Crew",
            "publication": "The Oregonian",
            "date": "1947-07-06",
            "url": "https://www.newspapers.com/article/the-oregonian-07-06-1947-ufo-report-by/38303478/"
        },
        {
            "type": "newspaper",
            "title": "Arizona Republic: United Airlines Crew Disc Sighting",
            "publication": "Arizona Republic",
            "date": "1947-07",
            "url": "https://www.newspapers.com/article/arizona-republic/130836916/"
        }
    ],
    "rhodes-photos-1947": [
        {
            "type": "newspaper",
            "title": "Arizona Republic: Rhodes UFO Photographs",
            "publication": "Arizona Republic",
            "date": "1947",
            "url": "https://www.newspapers.com/clip/110777683/arizona-republic/"
        }
    ],
    "mcminnville-photos-1950": [
        {
            "type": "newspaper",
            "title": "McMinnville UFO Photos Newspaper Coverage",
            "publication": "Newspapers.com",
            "date": "1950",
            "url": "https://www.newspapers.com/article/albany-democrat-herald-ufo-mcminnville/24909024/"
        }
    ],
    "mcminnville-1950": [
        {
            "type": "newspaper",
            "title": "McMinnville UFO Photos Newspaper Coverage",
            "publication": "Newspapers.com",
            "date": "1950",
            "url": "https://www.newspapers.com/article/albany-democrat-herald-ufo-mcminnville/24909024/"
        }
    ],
    "lubbock-lights-1951": [
        {
            "type": "newspaper",
            "title": "The Rock Island Argus: Lubbock Lights",
            "publication": "The Rock Island Argus",
            "date": "1951",
            "url": "https://www.newspapers.com/article/the-rock-island-argus-lubbock-lights/56257554/"
        },
        {
            "type": "newspaper",
            "title": "Albuquerque Journal: UFO Sightings in Lubbock",
            "publication": "Albuquerque Journal",
            "date": "1951",
            "url": "https://www.newspapers.com/article/albuquerque-journal-ufo-sightings-in-lu/34960019/"
        }
    ],
    "levelland-1957": [
        {
            "type": "newspaper",
            "title": "The Odessa American: Levelland UFO Sighting",
            "publication": "The Odessa American",
            "date": "1957-11-04",
            "url": "https://www.newspapers.com/article/the-odessa-american-levelland-ufo-sighti/24946181/"
        },
        {
            "type": "newspaper",
            "title": "The Morning Call: Levelland Texas UFO Incident",
            "publication": "The Morning Call",
            "date": "1957-11-04",
            "url": "https://www.newspapers.com/article/the-morning-call-levelland-tx-ufo-incide/13055932/"
        }
    ],
    "torres-intercept-1957": [
        {
            "type": "newspaper",
            "title": "The Guardian: Odd, Intriguing and Alarming UFO Files Released",
            "publication": "The Guardian",
            "date": "2008-10-20",
            "url": "https://www.theguardian.com/uk/2008/oct/20/aliens-crop-circles-ufo-roswell"
        },
        {
            "type": "article",
            "title": "Wired: Fighter Jets Ordered to Shoot Down UFO",
            "publication": "Wired",
            "date": "2008-10-20",
            "url": "https://www.wired.com/2008/10/fighter-jets-or/"
        }
    ],
    "vilas-boas-1957": [
        {
            "type": "article",
            "title": "WWNO: Probing Extraterrestrial Abduction",
            "publication": "WWNO",
            "date": "2013-11-27",
            "url": "https://www.wwno.org/2013-11-27/probing-extraterrestrial-abduction"
        },
        {
            "type": "article",
            "title": "Popular Mechanics: He Swore Aliens Experimented On Him",
            "publication": "Popular Mechanics",
            "date": "2025-08-28",
            "url": "https://www.popularmechanics.com/science/a65923360/alien-abduction-medical-explanation/"
        }
    ],
    "trindade-island-1958": [
        {
            "type": "article",
            "title": "The Black Vault: Trindade Island UFO Photographs",
            "publication": "The Black Vault",
            "date": "1958",
            "url": "https://documents.theblackvault.com/bluebookdesk/16Jan1958-Trinidade-Island.pdf"
        },
        {
            "type": "article",
            "title": "UFO Evidence: Almirante Saldanha UFO Sighting off Trindade Island",
            "publication": "UFO Evidence",
            "date": "2006",
            "url": "https://www.ufoevidence.org/documents/doc638.htm"
        }
    ],
    "betty-barney-hill-1961": [
        {
            "type": "newspaper",
            "title": "The Sun: Betty and Barney Hill",
            "publication": "The Sun",
            "date": "1971-11-14",
            "url": "https://www.newspapers.com/article/the-sun-hill/19023473/"
        },
        {
            "type": "article",
            "title": "UNH Library: Betty and Barney Hill Papers",
            "publication": "University of New Hampshire Library",
            "date": "2025",
            "url": "https://library.unh.edu/find/archives/collections/using-materials/using-betty-barney-hill-collection"
        }
    ],
    "hill-abduction-1961": [
        {
            "type": "newspaper",
            "title": "The Sun: Betty and Barney Hill",
            "publication": "The Sun",
            "date": "1971-11-14",
            "url": "https://www.newspapers.com/article/the-sun-hill/19023473/"
        },
        {
            "type": "article",
            "title": "UNH Library: Betty and Barney Hill Papers",
            "publication": "University of New Hampshire Library",
            "date": "2025",
            "url": "https://library.unh.edu/find/archives/collections/using-materials/using-betty-barney-hill-collection"
        }
    ],
    "washington-dc-1952": [
        {
            "type": "newspaper",
            "title": "The Washington Post: The Month That E.T. Came to D.C.",
            "publication": "The Washington Post",
            "date": "2012-07-20",
            "url": "https://www.washingtonpost.com/local/the-month-that-et-came-to-dc/2012/07/20/gJQAZp2ayW_story.html"
        }
    ],
    "flatwoods-1952": [
        {
            "type": "newspaper",
            "title": "The Raleigh Register: Flatwoods Monster",
            "publication": "The Raleigh Register",
            "date": "1952-09-14",
            "url": "https://www.newspapers.com/article/the-raleigh-register-flatwoods-monster/58215788/"
        }
    ],
    "flatwoods-monster-1952": [
        {
            "type": "newspaper",
            "title": "The Raleigh Register: Flatwoods Monster",
            "publication": "The Raleigh Register",
            "date": "1952-09-14",
            "url": "https://www.newspapers.com/article/the-raleigh-register-flatwoods-monster/58215788/"
        }
    ],
    "kelly-hopkinsville-1955": [
        {
            "type": "newspaper",
            "title": "The Leaf-Chronicle: Kelly-Hopkinsville Encounter",
            "publication": "The Leaf-Chronicle",
            "date": "1955-08-23",
            "url": "https://www.newspapers.com/article/the-leaf-chronicle-kelly-hopkinsville/98528992/"
        }
    ],
    "nash-fortenberry-1952": [
        {
            "type": "newspaper",
            "title": "The Miami Herald: Nash-Fortenberry UFO Sighting",
            "publication": "The Miami Herald",
            "date": "1952-07-17",
            "url": "https://www.newspapers.com/article/the-miami-herald-nash-fortenberry-ufo/86893292/"
        }
    ],
    "lakenheath-bentwaters-1956": [
        {
            "type": "article",
            "title": "Sky History: RAF Bentwaters UFO Incident",
            "publication": "Sky History",
            "date": "2024",
            "url": "https://www.history.co.uk/articles/raf-bentwaters-ufo-incident"
        }
    ],
    "florence-stadium-1954": [
        {
            "type": "article",
            "title": "BBC News: The Day UFOs Stopped Play",
            "publication": "BBC News",
            "date": "2014-10-24",
            "url": "https://www.bbc.com/news/magazine-29342407"
        }
    ],
    "dewilde-france-1954": [
        {
            "type": "newspaper",
            "title": "Le Courrier Picard: A Mysterious Craft",
            "publication": "Le Courrier Picard",
            "date": "1954-09-13",
            "url": "https://www.ufologie.patrickgross.org/press/lecourrierpicard13sep1954.htm"
        },
        {
            "type": "article",
            "title": "TIME: Martians Over France",
            "publication": "TIME",
            "date": "1954-10-25",
            "url": "https://content.time.com/time/subscriber/article/0,33009,823602,00.html"
        }
    ],
    "exeter-nh-1965": [
        {
            "type": "newspaper",
            "title": "Bennington Banner: Rash of UFO Sightings in Exeter",
            "publication": "Bennington Banner",
            "date": "1965-09-10",
            "url": "https://www.newspapers.com/article/bennington-banner-rash-of-ufo-sightings/28154025/"
        }
    ],
    "exeter-incident-1965": [
        {
            "type": "newspaper",
            "title": "Bennington Banner: Rash of UFO Sightings in Exeter",
            "publication": "Bennington Banner",
            "date": "1965-09-10",
            "url": "https://www.newspapers.com/article/bennington-banner-rash-of-ufo-sightings/28154025/"
        }
    ],
    "socorro-1964": [
        {
            "type": "newspaper",
            "title": "The Press-Tribune: Zamora Socorro UFO Sighting",
            "publication": "The Press-Tribune",
            "date": "1964-04-27",
            "url": "https://www.newspapers.com/article/the-press-tribune-zamora-socorro-ufo-sig/55072053/"
        },
        {
            "type": "newspaper",
            "title": "Alamogordo Daily News: UFO Socorro, New Mexico",
            "publication": "Alamogordo Daily News",
            "date": "1965-04-25",
            "url": "https://www.newspapers.com/article/alamogordo-daily-news-ufo-socorro-new-m/24046177/"
        }
    ],
    "zamora-socorro-1964": [
        {
            "type": "newspaper",
            "title": "The Press-Tribune: Zamora Socorro UFO Sighting",
            "publication": "The Press-Tribune",
            "date": "1964-04-27",
            "url": "https://www.newspapers.com/article/the-press-tribune-zamora-socorro-ufo-sig/55072053/"
        },
        {
            "type": "newspaper",
            "title": "Alamogordo Daily News: UFO Socorro, New Mexico",
            "publication": "Alamogordo Daily News",
            "date": "1965-04-25",
            "url": "https://www.newspapers.com/article/alamogordo-daily-news-ufo-socorro-new-m/24046177/"
        }
    ],
    "solway-spaceman-1964": [
        {
            "type": "article",
            "title": "Ian Duncan Media: The Solway Spaceman",
            "publication": "News & Star / Ian Duncan Media",
            "date": "2014-05-21",
            "url": "https://ian-duncan.co.uk/2024/05/21/the-solway-spaceman/"
        },
        {
            "type": "article",
            "title": "BBC News: The Mystery of the Solway Spaceman",
            "publication": "BBC News",
            "date": "2014-05-23",
            "url": "https://www.bbc.com/news/uk-england-cumbria-27391210"
        }
    ],
    "shag-harbour-1967": [
        {
            "type": "newspaper",
            "title": "Times Colonist: Shag Harbour UFO",
            "publication": "Times Colonist",
            "date": "1967-10-07",
            "url": "https://www.newspapers.com/article/times-colonist-shag-harbour-ufo/193975989/"
        }
    ],
    "kecksburg-1965": [
        {
            "type": "newspaper",
            "title": "The Spokesman-Review: Kecksburg UFO Sighting",
            "publication": "The Spokesman-Review",
            "date": "1965-12-10",
            "url": "https://www.newspapers.com/article/the-spokesman-review-12101965-kecksb/47002415/"
        },
        {
            "type": "newspaper",
            "title": "The Evening Standard: Kecksburg UFO Crash",
            "publication": "The Evening Standard",
            "date": "1965-12-10",
            "url": "https://www.newspapers.com/article/the-evening-standard-kecksburg-ufo-crash/196196095/"
        }
    ],
    "westall-1966": [
        {
            "type": "article",
            "title": "State Library Victoria: Strange Lights in the Sky",
            "publication": "State Library Victoria",
            "date": "2016",
            "url": "https://blogs.slv.vic.gov.au/our-stories/strange-lights-in-the-sky-the-westall-ufo-event-1966/"
        }
    ],
    "falcon-lake-1967": [
        {
            "type": "article",
            "title": "CBC: Falcon Lake Incident Anniversary",
            "publication": "CBC News",
            "date": "2017-05-20",
            "url": "https://www.cbc.ca/news/canada/manitoba/falcon-lake-incident-book-anniversary-1.4121639"
        }
    ],
    "canadian-shield-1967": [
        {
            "type": "article",
            "title": "CBC: Falcon Lake Incident Anniversary",
            "publication": "CBC News",
            "date": "2017-05-20",
            "url": "https://www.cbc.ca/news/canada/manitoba/falcon-lake-incident-book-anniversary-1.4121639"
        }
    ],
    "malmstrom-1967": [
        {
            "type": "newspaper",
            "title": "Great Falls Tribune: 1967 UFO Incident Still Mystifies Man",
            "publication": "Great Falls Tribune",
            "date": "1996-08-13",
            "url": "https://www.newspapers.com/article/great-falls-tribune-1967-ufo-incident-s/121380222/"
        },
        {
            "type": "article",
            "title": "CBS News: Ex-Air Force Personnel Say UFOs Deactivated Nukes",
            "publication": "CBS News",
            "date": "2010-09-28",
            "url": "https://www.cbsnews.com/news/ex-air-force-personnel-ufos-deactivated-nukes/"
        }
    ],
    "malmstrom-nukes-1967": [
        {
            "type": "newspaper",
            "title": "Great Falls Tribune: 1967 UFO Incident Still Mystifies Man",
            "publication": "Great Falls Tribune",
            "date": "1996-08-13",
            "url": "https://www.newspapers.com/article/great-falls-tribune-1967-ufo-incident-s/121380222/"
        },
        {
            "type": "article",
            "title": "Wired: UFOs Neutered Nukes, Air Force Officers Claim",
            "publication": "Wired",
            "date": "2010-09-28",
            "url": "https://www.wired.com/2010/09/tinfoil-tuesdays-ufos-neutered-nukes-air-force-officers-claim/"
        }
    ],
    "jimmy-carter-1969": [
        {
            "type": "article",
            "title": "HISTORY: Jimmy Carter Files Report on UFO Sighting",
            "publication": "HISTORY",
            "date": "2009-11-16",
            "url": "https://www.history.com/this-day-in-history/september-18/carter-files-report-on-ufo-sighting"
        },
        {
            "type": "newspaper",
            "title": "FOX 5 Atlanta: In 1969, Jimmy Carter Saw a UFO in Georgia",
            "publication": "FOX 5 Atlanta",
            "date": "2023-02-19",
            "url": "https://www.fox5atlanta.com/news/jimmy-carter-ufo-sighting"
        }
    ],
    "berkshire-1969": [
        {
            "type": "article",
            "title": "New England Public Media: Revisiting an Alleged Alien Sighting in Western Mass.",
            "publication": "New England Public Media",
            "date": "2023-12-15",
            "url": "https://www.nepm.org/regional-news/2023-12-15/revisiting-an-alleged-alien-sighting-in-western-mass-as-ufo-talk-spreads-to-congress-election"
        },
        {
            "type": "article",
            "title": "Skeptical Inquirer: The Berkshire UFO Abduction Incident",
            "publication": "Skeptical Inquirer",
            "date": "2024-10",
            "url": "https://skepticalinquirer.org/2024/10/the-berkshire-ufo-abduction-incident/"
        }
    ],
    "pascagoula-abduction-1973": [
        {
            "type": "newspaper",
            "title": "The Clarion-Ledger: Pascagoula Abduction",
            "publication": "The Clarion-Ledger",
            "date": "1973-10-14",
            "url": "https://www.newspapers.com/article/clarion-ledger-pascagoula-abduction/9630218/"
        }
    ],
    "pascagoula-1973": [
        {
            "type": "newspaper",
            "title": "The Clarion-Ledger: Pascagoula Abduction",
            "publication": "The Clarion-Ledger",
            "date": "1973-10-14",
            "url": "https://www.newspapers.com/article/clarion-ledger-pascagoula-abduction/9630218/"
        }
    ],
    "travis-walton-1975": [
        {
            "type": "newspaper",
            "title": "The Arizona Republic: Snowflake Baffled by Missing Logger Case",
            "publication": "The Arizona Republic",
            "date": "1975-11-13",
            "url": "https://www.newspapers.com/article/the-arizona-republic-snowflake-baffled-1/189765234/"
        }
    ],
    "john-lennon-1974": [
        {
            "type": "article",
            "title": "The Beatles Story: John Lennon's UFO Sighting",
            "publication": "The Beatles Story",
            "date": "2023-06-30",
            "url": "https://www.beatlesstory.com/blog/john-lennon-ufo-sighting/"
        },
        {
            "type": "newspaper",
            "title": "New York Post: Famous Big Apple UFO Cases",
            "publication": "New York Post",
            "date": "2024-11-24",
            "url": "https://nypost.com/2024/11/24/us-news/a-mysterious-orb-caught-on-video-zooming-over-nyc-is-just-latest-big-apple-ufo-here-are-some-famous-cases/"
        }
    ],
    "tehran-1976": [
        {
            "type": "article",
            "title": "NSA: The U.S. Government and the Iran Case",
            "publication": "National Security Agency",
            "date": "1976-09-19",
            "url": "https://www.nsa.gov/portals/75/documents/news-features/declassified-documents/ufo/us_gov_iran_case.pdf"
        },
        {
            "type": "article",
            "title": "NSA: Joint Chiefs of Staff Report on Iran UFO Sighting",
            "publication": "National Security Agency",
            "date": "1976-09-19",
            "url": "https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/FOIA-Reports-and-Releases/FOIA-Reports-and-Releases-List/igphoto/2002761354/"
        }
    ],
    "colares-1977": [
        {
            "type": "article",
            "title": "BBC News Brasil: Raios Luminosos e Moradores Apavorados",
            "publication": "BBC News Brasil",
            "date": "2017-08-05",
            "url": "https://www.bbc.com/portuguese/brasil-40784488"
        },
        {
            "type": "article",
            "title": "G1: OVNIs no Brasil e a Operacao Prato",
            "publication": "G1",
            "date": "2021-07-07",
            "url": "https://g1.globo.com/ciencia-e-saude/noticia/2021/07/07/ovnis-no-brasil-o-que-foi-a-operacao-prato-investigacao-da-ditadura-sobre-fenomenos-ufologicos.ghtml"
        }
    ],
    "colares-operation-saucer-1977": [
        {
            "type": "article",
            "title": "BBC News Brasil: Raios Luminosos e Moradores Apavorados",
            "publication": "BBC News Brasil",
            "date": "2017-08-05",
            "url": "https://www.bbc.com/portuguese/brasil-40784488"
        },
        {
            "type": "article",
            "title": "G1: OVNIs no Brasil e a Operacao Prato",
            "publication": "G1",
            "date": "2021-07-07",
            "url": "https://g1.globo.com/ciencia-e-saude/noticia/2021/07/07/ovnis-no-brasil-o-que-foi-a-operacao-prato-investigacao-da-ditadura-sobre-fenomenos-ufologicos.ghtml"
        }
    ],
    "operacao-prato-1977": [
        {
            "type": "article",
            "title": "BBC News Brasil: Raios Luminosos e Moradores Apavorados",
            "publication": "BBC News Brasil",
            "date": "2017-08-05",
            "url": "https://www.bbc.com/portuguese/brasil-40784488"
        },
        {
            "type": "article",
            "title": "G1: OVNIs no Brasil e a Operacao Prato",
            "publication": "G1",
            "date": "2021-07-07",
            "url": "https://g1.globo.com/ciencia-e-saude/noticia/2021/07/07/ovnis-no-brasil-o-que-foi-a-operacao-prato-investigacao-da-ditadura-sobre-fenomenos-ufologicos.ghtml"
        }
    ],
    "petrozavodsk-1977": [
        {
            "type": "article",
            "title": "The Moscow Times: A Look at the Official Soviet X-Files Investigation",
            "publication": "The Moscow Times",
            "date": "2016-03-31",
            "url": "https://www.themoscowtimes.com/2016/03/31/little-green-men-a-look-at-the-official-soviet-x-files-investigation-a52335"
        },
        {
            "type": "article",
            "title": "IFLScience: The Petrozavodsk Phenomenon",
            "publication": "IFLScience",
            "date": "2025-07-12",
            "url": "https://www.iflscience.com/the-petrozavodsk-phenomenon-a-celestial-mystery-seen-over-1977-soviet-russia-80128"
        }
    ],
    "valentich-1978": [
        {
            "type": "newspaper",
            "title": "The Age: Valentich Disappearance",
            "publication": "The Age",
            "date": "1978-10-23",
            "url": "https://news.google.com/newspapers?nid=1300&dat=19781023&id=E_UQAAAAIBAJ&pg=4250,4121175"
        }
    ],
    "frederick-valentich-1978": [
        {
            "type": "newspaper",
            "title": "The Age: Valentich Disappearance",
            "publication": "The Age",
            "date": "1978-10-23",
            "url": "https://news.google.com/newspapers?nid=1300&dat=19781023&id=E_UQAAAAIBAJ&pg=4250,4121175"
        }
    ],
    "kaikoura-lights-1978": [
        {
            "type": "newspaper",
            "title": "The Press: Mystery Lights Seen from Aircraft",
            "publication": "The Press",
            "date": "1978-12-27",
            "url": "https://paperspast.natlib.govt.nz/newspapers/CHP19781227.2.12"
        },
        {
            "type": "newspaper",
            "title": "The Press: More Reports of Mystery Lights",
            "publication": "The Press",
            "date": "1979-01-02",
            "url": "https://paperspast.natlib.govt.nz/newspapers/CHP19790102.2.2"
        }
    ],
    "new-zealand-1978": [
        {
            "type": "newspaper",
            "title": "The Press: Mystery Lights Seen from Aircraft",
            "publication": "The Press",
            "date": "1978-12-27",
            "url": "https://paperspast.natlib.govt.nz/newspapers/CHP19781227.2.12"
        },
        {
            "type": "newspaper",
            "title": "The Press: More Reports of Mystery Lights",
            "publication": "The Press",
            "date": "1979-01-02",
            "url": "https://paperspast.natlib.govt.nz/newspapers/CHP19790102.2.2"
        }
    ],
    "cash-landrum-1980": [
        {
            "type": "newspaper",
            "title": "The Danville News: Cash-Landrum Incident",
            "publication": "The Danville News",
            "date": "1985-09-04",
            "url": "https://www.newspapers.com/article/the-danville-news-cash-landrum-incident/195790381/"
        },
        {
            "type": "article",
            "title": "Texas Monthly: Close Encounters of the Lone Star Kind",
            "publication": "Texas Monthly",
            "date": "2006-12-31",
            "url": "https://www.texasmonthly.com/the-culture/close-encounters-of-the-lone-star-kind/"
        }
    ],
    "robert-taylor-1979": [
        {
            "type": "newspaper",
            "title": "Daily Record: The Scottish UFO Encounter That Became an Alien Criminal Investigation",
            "publication": "Daily Record",
            "date": "2026-06",
            "url": "https://www.dailyrecord.co.uk/scotland-now/scottish-ufo-encounter-became-worlds-37253452"
        },
        {
            "type": "article",
            "title": "Undiscovered Scotland: The Livingston Incident",
            "publication": "Undiscovered Scotland",
            "date": "2024",
            "url": "https://www.undiscoveredscotland.co.uk/livingston/livingstonincident/index.html"
        }
    ],
    "manises-1979": [
        {
            "type": "newspaper",
            "title": "El Pais: Un OVNI Forzo el Aterrizaje de un Caravelle en Manises",
            "publication": "El Pais",
            "date": "1979-11-13",
            "url": "https://elpais.com/diario/1979/11/13/espana/311295627_850215.html"
        },
        {
            "type": "article",
            "title": "El Pais in English: Revealing 33 Years of UFOs Over Catalonia",
            "publication": "El Pais",
            "date": "2016-11-11",
            "url": "https://english.elpais.com/cat/2016/11/11/catalunya/1478881679_067169.html"
        }
    ],
    "rendlesham-1980": [
        {
            "type": "newspaper",
            "title": "The Guardian: US Base's Report of UFO Crash Had MoD in a Panic",
            "publication": "The Guardian",
            "date": "2001-08-28",
            "url": "https://www.theguardian.com/uk/2001/aug/28/humanities.highereducation"
        },
        {
            "type": "article",
            "title": "The Guardian: The Rendlesham Forest Mystery",
            "publication": "The Guardian",
            "date": "2026-04-30",
            "url": "https://www.theguardian.com/world/2026/apr/30/the-rendlesham-forest-mystery-its-the-perfect-storm-of-a-ufo-case"
        }
    ],
    "trans-en-provence-1981": [
        {
            "type": "newspaper",
            "title": "The Guardian: The Aliens Have Landed in France",
            "publication": "The Guardian",
            "date": "2007-04-02",
            "url": "https://www.theguardian.com/world/2007/apr/02/france.features11"
        },
        {
            "type": "article",
            "title": "RealClearHistory: Did UFO Land in Trans-en-Provence?",
            "publication": "RealClearHistory",
            "date": "2017-01-07",
            "url": "https://www.realclearhistory.com/2017/01/07/did_ufo_land_in_trans-en-provence_1200.html"
        }
    ],
    "hudson-valley-1983": [
        {
            "type": "newspaper",
            "title": "Times Union: The Mysterious History of the Hudson Valley UFO Sightings",
            "publication": "Times Union",
            "date": "2024",
            "url": "https://www.timesunion.com/hudsonvalley/history/article/ufo-sightings-westchester-pine-bush-mystery-19363246.php"
        },
        {
            "type": "article",
            "title": "The Debrief: How the Media Reacted to a 1980s UFO Flap",
            "publication": "The Debrief",
            "date": "2022",
            "url": "https://thedebrief.org/the-hudson-valley-ufos-how-the-media-reacted-to-a-1980s-ufo-flap/"
        }
    ],
    "hudson-valley-wave-1983": [
        {
            "type": "newspaper",
            "title": "Times Union: The Mysterious History of the Hudson Valley UFO Sightings",
            "publication": "Times Union",
            "date": "2024",
            "url": "https://www.timesunion.com/hudsonvalley/history/article/ufo-sightings-westchester-pine-bush-mystery-19363246.php"
        },
        {
            "type": "article",
            "title": "The Debrief: How the Media Reacted to a 1980s UFO Flap",
            "publication": "The Debrief",
            "date": "2022",
            "url": "https://thedebrief.org/the-hudson-valley-ufos-how-the-media-reacted-to-a-1980s-ufo-flap/"
        }
    ],
    "montreal-1990": [
        {
            "type": "article",
            "title": "Canadian Geographic: Area 514, The 1990 Montreal UFO Sighting",
            "publication": "Canadian Geographic",
            "date": "2025-10-06",
            "url": "https://canadiangeographic.ca/articles/area-514-the-1990-montreal-ufo-sighting/"
        }
    ],
    "yukon-1996": [
        {
            "type": "newspaper",
            "title": "Canadian Press: Some of the Best-Known Canadian UFO Sightings",
            "publication": "CityNews Toronto",
            "date": "2025-07-18",
            "url": "https://toronto.citynews.ca/2025/07/18/some-of-the-best-known-canadian-ufo-sightings-over-the-years/"
        }
    ],
    "yukon-giant-1996": [
        {
            "type": "newspaper",
            "title": "Canadian Press: Some of the Best-Known Canadian UFO Sightings",
            "publication": "CityNews Toronto",
            "date": "2025-07-18",
            "url": "https://toronto.citynews.ca/2025/07/18/some-of-the-best-known-canadian-ufo-sightings-over-the-years/"
        }
    ],
    "height-611-1986": [
        {
            "type": "article",
            "title": "CIA Reading Room: USSR Media Report Multitude of UFO Sightings",
            "publication": "Central Intelligence Agency",
            "date": "1989",
            "url": "https://www.cia.gov/readingroom/docs/DOC_0000042346.pdf"
        }
    ],
    "sao-paulo-1986": [
        {
            "type": "newspaper",
            "title": "Folha de S.Paulo: 40 Anos da Noite em que Cacas da FAB Perseguiram 21 Ovnis",
            "publication": "Folha de S.Paulo",
            "date": "2026-05-19",
            "url": "https://www1.folha.uol.com.br/cotidiano/2026/05/40-anos-da-noite-em-que-cacas-da-forca-aerea-perseguiram-21-ovnis.shtml"
        },
        {
            "type": "article",
            "title": "Portal Gov.br: Official UFO Night in Brazil",
            "publication": "Government of Brazil",
            "date": "2022-05-19",
            "url": "https://www.gov.br/en/government-of-brazil/latest-news/2022/official-ufo-night-in-brazil"
        }
    ],
    "brazil-night-ufos-1986": [
        {
            "type": "newspaper",
            "title": "Folha de S.Paulo: 40 Anos da Noite em que Cacas da FAB Perseguiram 21 Ovnis",
            "publication": "Folha de S.Paulo",
            "date": "2026-05-19",
            "url": "https://www1.folha.uol.com.br/cotidiano/2026/05/40-anos-da-noite-em-que-cacas-da-forca-aerea-perseguiram-21-ovnis.shtml"
        },
        {
            "type": "article",
            "title": "Portal Gov.br: Official UFO Night in Brazil",
            "publication": "Government of Brazil",
            "date": "2022-05-19",
            "url": "https://www.gov.br/en/government-of-brazil/latest-news/2022/official-ufo-night-in-brazil"
        }
    ],
    "dalnegorsk-1986": [
        {
            "type": "article",
            "title": "CIA Reading Room: USSR Media Report Multitude of UFO Sightings",
            "publication": "Central Intelligence Agency",
            "date": "1989",
            "url": "https://www.cia.gov/readingroom/docs/DOC_0000042346.pdf"
        }
    ],
    "japan-airlines-1986": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Pilot Recounts Sighting of UFO",
            "publication": "Los Angeles Times",
            "date": "1987-01-01",
            "url": "https://www.latimes.com/archives/la-xpm-1987-01-01-mn-1922-story.html"
        }
    ],
    "japan-airlines-anchorage-1987": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Pilot Recounts Sighting of UFO",
            "publication": "Los Angeles Times",
            "date": "1987-01-01",
            "url": "https://www.latimes.com/archives/la-xpm-1987-01-01-mn-1922-story.html"
        }
    ],
    "jal-1628-1986": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Pilot Recounts Sighting of UFO",
            "publication": "Los Angeles Times",
            "date": "1987-01-01",
            "url": "https://www.latimes.com/archives/la-xpm-1987-01-01-mn-1922-story.html"
        }
    ],
    "alaska-jal-additional-1986": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Pilot Recounts Sighting of UFO",
            "publication": "Los Angeles Times",
            "date": "1987-01-01",
            "url": "https://www.latimes.com/archives/la-xpm-1987-01-01-mn-1922-story.html"
        }
    ],
    "gulf-breeze-1987": [
        {
            "type": "article",
            "title": "Pensacola News Journal: Gulf Breeze UFO Sightings, 30 Years Later",
            "publication": "Pensacola News Journal",
            "date": "2017-11-10",
            "url": "https://www.pnj.com/story/news/2017/11/10/mystery-gulf-breeze-ufo-sightings-30-years-later/849564001/"
        }
    ],
    "belgium-wave-1989": [
        {
            "type": "article",
            "title": "The Week: The Belgian UFO Wave",
            "publication": "The Week",
            "date": "2018-11-15",
            "url": "https://theweek.com/articles/807491/30year-old-ufo-sighting-that-sparked-conspiracy-theories-belgium"
        }
    ],
    "voronezh-1989": [
        {
            "type": "newspaper",
            "title": "Daily Kent Stater: Soviet Scientists Attest to UFO Landings",
            "publication": "Daily Kent Stater",
            "date": "1989-10-10",
            "url": "https://dks.library.kent.edu/?a=d&d=dks19891010-01.2.6"
        },
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Tass Says It Relied on Children for Account of UFO's Landing",
            "publication": "Los Angeles Times",
            "date": "1989-10-10",
            "url": "https://www.latimes.com/archives/la-xpm-1989-10-10-mn-326-story.html"
        },
        {
            "type": "article",
            "title": "TIME: Why Aliens Landed in Russia 25 Years Ago",
            "publication": "TIME",
            "date": "2014-10-09",
            "url": "https://time.com/3475954/voronezh-ufo-report-1989/"
        }
    ],
    "hessdalen-ongoing": [
        {
            "type": "article",
            "title": "TIME: See the Norwegian Town at the Center of a UFO Mania",
            "publication": "TIME",
            "date": "2015-05-18",
            "url": "https://time.com/3824196/see-the-norwegian-town-at-the-center-of-a-ufo-mania/"
        }
    ],
    "skinwalker-ranch": [
        {
            "type": "article",
            "title": "KSL: Mystery of Utah's Skinwalker Ranch Very Much Alive",
            "publication": "KSL",
            "date": "2020-10-27",
            "url": "https://www.ksl.com/article/news/utah/mystery-of-utahs-skinwalker-ranch-very-much-alive/50038373"
        },
        {
            "type": "article",
            "title": "Newsweek: Skinwalker Ranch, The UFO Hotspot in Utah",
            "publication": "Newsweek",
            "date": "2022-04-28",
            "url": "https://www.newsweek.com/ufo-skinwalker-ranch-utah-pentagon-paranormal-1701730"
        },
        {
            "type": "article",
            "title": "Wired: Inside Robert Bigelow's Decades-Long Obsession With UFOs",
            "publication": "Wired",
            "date": "2018-02-24",
            "url": "https://www.wired.com/story/inside-robert-bigelows-decades-long-obsession-with-ufos/"
        }
    ],
    "knowles-family-1988": [
        {
            "type": "newspaper",
            "title": "The Canberra Times: UFO Encounter on Nullarbor Plain Reported",
            "publication": "The Canberra Times",
            "date": "1988-01-21",
            "url": "https://trove.nla.gov.au/newspaper/article/101971256"
        },
        {
            "type": "article",
            "title": "ABC News: South Australia's X-Files",
            "publication": "ABC News Australia",
            "date": "2018-02-23",
            "url": "https://www.abc.net.au/news/curious-adelaide-ufo-sightings-across-australia/9466950"
        }
    ],
    "calvine-1990": [
        {
            "type": "newspaper",
            "title": "The Guardian: What Really Happened in Calvine?",
            "publication": "The Guardian",
            "date": "2025-02-11",
            "url": "https://www.theguardian.com/world/2025/feb/11/what-really-happened-in-calvine-the-mystery-behind-the-best-ufo-picture-ever-seen"
        },
        {
            "type": "article",
            "title": "Newsweek: Best UFO Picture Ever, the Calvine Photo, Found After 30 Years Missing",
            "publication": "Newsweek",
            "date": "2022-08-15",
            "url": "https://www.newsweek.com/best-ufo-picture-calvine-photo-found-30-years-missing-1733673"
        }
    ],
    "lake-michigan-1994": [
        {
            "type": "article",
            "title": "WWMT: Remembering West Michigan's Most Famous UFO Sighting",
            "publication": "WWMT",
            "date": "2024-03-08",
            "url": "https://wwmt.com/news/local/ufo-michigan-sighting-holland-famous-ottawa-lake-jack-bushong-mike-walsh-lee-lamberts-cindy-pravda-unsolved-mysteries-mufon-unidentified-aerial-phenomenon"
        },
        {
            "type": "article",
            "title": "WWMT: Retired Meteorologist Shares His Account of 1994 UFO Sightings",
            "publication": "WWMT",
            "date": "2020-09-03",
            "url": "https://wwmt.com/news/local/retired-meteorologist-shares-his-account-of-1994-west-michigan-ufo-sightings"
        }
    ],
    "michigan-1994": [
        {
            "type": "article",
            "title": "WWMT: Remembering West Michigan's Most Famous UFO Sighting",
            "publication": "WWMT",
            "date": "2024-03-08",
            "url": "https://wwmt.com/news/local/ufo-michigan-sighting-holland-famous-ottawa-lake-jack-bushong-mike-walsh-lee-lamberts-cindy-pravda-unsolved-mysteries-mufon-unidentified-aerial-phenomenon"
        },
        {
            "type": "article",
            "title": "WWMT: Retired Meteorologist Shares His Account of 1994 UFO Sightings",
            "publication": "WWMT",
            "date": "2020-09-03",
            "url": "https://wwmt.com/news/local/retired-meteorologist-shares-his-account-of-1994-west-michigan-ufo-sightings"
        }
    ],
    "varginha-1996": [
        {
            "type": "newspaper",
            "title": "The Wall Street Journal: UFO Spotters Flock to Varginha",
            "publication": "The Wall Street Journal",
            "date": "1996-06-25",
            "url": "https://www.wsj.com/articles/SB835480720653648500"
        }
    ],
    "varginha-incident-1996": [
        {
            "type": "newspaper",
            "title": "The Wall Street Journal: UFO Spotters Flock to Varginha",
            "publication": "The Wall Street Journal",
            "date": "1996-06-25",
            "url": "https://www.wsj.com/articles/SB835480720653648500"
        }
    ],
    "phoenix-lights-1997": [
        {
            "type": "newspaper",
            "title": "The Arizona Republic: Phoenix Lights",
            "publication": "The Arizona Republic",
            "date": "1997-06-30",
            "url": "https://www.newspapers.com/clip/19877584/phoenix-lights/"
        },
        {
            "type": "newspaper",
            "title": "The Index-Journal: Phoenix Lights",
            "publication": "The Index-Journal",
            "date": "1997-07-27",
            "url": "https://www.newspapers.com/clip/19877651/phoenix-lights/"
        }
    ],
    "phoenix-az-additional-1997": [
        {
            "type": "newspaper",
            "title": "The Arizona Republic: Phoenix Lights",
            "publication": "The Arizona Republic",
            "date": "1997-06-30",
            "url": "https://www.newspapers.com/clip/19877584/phoenix-lights/"
        },
        {
            "type": "newspaper",
            "title": "The Index-Journal: Phoenix Lights",
            "publication": "The Index-Journal",
            "date": "1997-07-27",
            "url": "https://www.newspapers.com/clip/19877651/phoenix-lights/"
        }
    ],
    "ariel-school-1994": [
        {
            "type": "article",
            "title": "BBC Witness History: Zimbabwe's Mass UFO Sightings",
            "publication": "BBC World Service",
            "date": "2021-06-28",
            "url": "https://wspartners.bbc.com/episode/w3ct1x0z"
        },
        {
            "type": "article",
            "title": "WHYY: Documentary Explores the UFO Sighting That Changed 62 Children's Lives",
            "publication": "WHYY",
            "date": "2023-10-23",
            "url": "https://whyy.org/segments/documentary-explores-the-ufo-sighting-that-changed-the-course-of-62-childrens-lives/"
        }
    ],
    "nimitz-2004": [
        {
            "type": "newspaper",
            "title": "The New York Times: Glowing Auras and Black Money",
            "publication": "The New York Times",
            "date": "2017-12-16",
            "url": "https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html"
        }
    ],
    "uss-nimitz-2004": [
        {
            "type": "newspaper",
            "title": "The New York Times: Glowing Auras and Black Money",
            "publication": "The New York Times",
            "date": "2017-12-16",
            "url": "https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html"
        }
    ],
    "nimitz-tic-tac-2004": [
        {
            "type": "newspaper",
            "title": "The New York Times: Glowing Auras and Black Money",
            "publication": "The New York Times",
            "date": "2017-12-16",
            "url": "https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html"
        },
        {
            "type": "article",
            "title": "HISTORY: When Top Gun Pilots Tangled With a Tic-Tac-Shaped UFO",
            "publication": "HISTORY",
            "date": "2019-05-16",
            "url": "https://www.history.com/articles/uss-nimitz-2004-tic-tac-ufo-encounter"
        }
    ],
    "gimbal-2015": [
        {
            "type": "newspaper",
            "title": "The New York Times: Wow, What Is That?",
            "publication": "The New York Times",
            "date": "2019-05-26",
            "url": "https://www.nytimes.com/2019/05/26/us/politics/ufo-sightings-navy-pilots.html"
        }
    ],
    "uss-roosevelt-2014": [
        {
            "type": "newspaper",
            "title": "The New York Times: Wow, What Is That?",
            "publication": "The New York Times",
            "date": "2019-05-26",
            "url": "https://www.nytimes.com/2019/05/26/us/politics/ufo-sightings-navy-pilots.html"
        }
    ],
    "ohare-2006": [
        {
            "type": "newspaper",
            "title": "Chicago Tribune: In the Sky! A Bird? A Plane? A UFO?",
            "publication": "Chicago Tribune",
            "date": "2007-01-01",
            "url": "https://www.chicagotribune.com/news/ct-xpm-2007-01-01-0701010120-story.html"
        },
        {
            "type": "article",
            "title": "WTTW: The 2006 O'Hare UFO Sighting",
            "publication": "WTTW",
            "date": "2021-03-15",
            "url": "https://news.wttw.com/2021/03/15/chicago-ohare-ufo-sighting-2006"
        }
    ],
    "alderney-2007": [
        {
            "type": "newspaper",
            "title": "BBC News: Pilot Spots UFO Over Guernsey",
            "publication": "BBC News",
            "date": "2007-04-25",
            "url": "http://news.bbc.co.uk/1/hi/world/europe/guernsey/6591365.stm"
        },
        {
            "type": "newspaper",
            "title": "The Register: UK Airline Pilots Spot Giant UFO",
            "publication": "The Register",
            "date": "2007-04-27",
            "url": "https://www.theregister.com/2007/04/27/airline_ufo/"
        }
    ],
    "alderney-channel-islands-2007": [
        {
            "type": "newspaper",
            "title": "BBC News: Pilot Spots UFO Over Guernsey",
            "publication": "BBC News",
            "date": "2007-04-25",
            "url": "http://news.bbc.co.uk/1/hi/world/europe/guernsey/6591365.stm"
        },
        {
            "type": "newspaper",
            "title": "The Register: UK Airline Pilots Spot Giant UFO",
            "publication": "The Register",
            "date": "2007-04-27",
            "url": "https://www.theregister.com/2007/04/27/airline_ufo/"
        }
    ],
    "tinley-park-2004": [
        {
            "type": "article",
            "title": "Chicago Magazine: Do You Believe?",
            "publication": "Chicago Magazine",
            "date": "2007-03",
            "url": "https://www.chicagomag.com/chicago-magazine/march-2007/do-you-believe/"
        },
        {
            "type": "article",
            "title": "Patch: UFO Expert on Tinley Park's 2004 Sightings",
            "publication": "Patch",
            "date": "2017-09-20",
            "url": "https://patch.com/illinois/tinleypark/ufo-expert-tinley-parks-2004-sightings-they-were-not-hoax"
        }
    ],
    "turkey-2008": [
        {
            "type": "newspaper",
            "title": "The Irish Times: UFO-Spotting Turkish Night-Watchman Regards Aliens as the World's Policemen",
            "publication": "The Irish Times",
            "date": "2009-06-22",
            "url": "https://www.irishtimes.com/news/ufo-spotting-turkish-night-watchman-regards-aliens-as-the-world-s-policemen-1.789220"
        }
    ],
    "turkey-ufo-videos-2007": [
        {
            "type": "newspaper",
            "title": "The Irish Times: UFO-Spotting Turkish Night-Watchman Regards Aliens as the World's Policemen",
            "publication": "The Irish Times",
            "date": "2009-06-22",
            "url": "https://www.irishtimes.com/news/ufo-spotting-turkish-night-watchman-regards-aliens-as-the-world-s-policemen-1.789220"
        }
    ],
    "hangzhou-2010": [
        {
            "type": "newspaper",
            "title": "ABC News: UFO in China's Skies Prompts Investigation",
            "publication": "ABC News",
            "date": "2010-07-14",
            "url": "https://abcnews.com/International/ufo-china-closes-airport-prompts-investigation/story?id=11159531"
        },
        {
            "type": "newspaper",
            "title": "China Daily: Calling Occupants of Inter-Planetary Craft",
            "publication": "China Daily",
            "date": "2010-10-31",
            "url": "https://www.chinadaily.com.cn/m/qingdao/2010-10/31/content_11483068.htm"
        }
    ],
    "hangzhou-airport-2010": [
        {
            "type": "newspaper",
            "title": "ABC News: UFO in China's Skies Prompts Investigation",
            "publication": "ABC News",
            "date": "2010-07-14",
            "url": "https://abcnews.com/International/ufo-china-closes-airport-prompts-investigation/story?id=11159531"
        },
        {
            "type": "newspaper",
            "title": "China Daily: Calling Occupants of Inter-Planetary Craft",
            "publication": "China Daily",
            "date": "2010-10-31",
            "url": "https://www.chinadaily.com.cn/m/qingdao/2010-10/31/content_11483068.htm"
        }
    ],
    "stephenville-2008": [
        {
            "type": "article",
            "title": "NPR: Dozens in Texas Town Report Seeing UFO",
            "publication": "NPR",
            "date": "2008-01-16",
            "url": "https://www.npr.org/2008/01/16/18146244/dozens-in-texas-town-report-seeing-ufo"
        }
    ],
    "aguadilla-2013": [
        {
            "type": "article",
            "title": "The Black Vault: Aguadilla Puerto Rico UAP Incident",
            "publication": "The Black Vault",
            "date": "2013-04-25",
            "url": "https://www.theblackvault.com/casefiles/aguadilla-puerto-rico-ufo-incident-april-25-2013/"
        }
    ],
    "uss-omaha-transmedium-2019": [
        {
            "type": "newspaper",
            "title": "Global News: Leaked Video Appears to Show UFO Plunging Under Water",
            "publication": "Global News",
            "date": "2021-05-17",
            "url": "https://globalnews.ca/news/7871671/ufo-video-water-san-diego-california-2019-omaha/"
        },
        {
            "type": "article",
            "title": "KIRO 7: Pentagon Confirms Footage Came From Navy Personnel",
            "publication": "KIRO 7",
            "date": "2021-05-18",
            "url": "https://www.kiro7.com/news/trending/must-see-did-sailors-spot-ufo-2019-pentagon-confirms-footage-came-navy-personnel/6RENW25BVRBALAITWNXHU6NYGI/"
        }
    ],
    "uss-omaha-sphere-2019": [
        {
            "type": "newspaper",
            "title": "Global News: Leaked Video Appears to Show UFO Plunging Under Water",
            "publication": "Global News",
            "date": "2021-05-17",
            "url": "https://globalnews.ca/news/7871671/ufo-video-water-san-diego-california-2019-omaha/"
        },
        {
            "type": "article",
            "title": "KIRO 7: Pentagon Confirms Footage Came From Navy Personnel",
            "publication": "KIRO 7",
            "date": "2021-05-18",
            "url": "https://www.kiro7.com/news/trending/must-see-did-sailors-spot-ufo-2019-pentagon-confirms-footage-came-navy-personnel/6RENW25BVRBALAITWNXHU6NYGI/"
        }
    ],
    "alaska-shootdown-2023": [
        {
            "type": "newspaper",
            "title": "AP: US Jet Shoots Down Unknown Object Flying Off Alaska Coast",
            "publication": "Associated Press",
            "date": "2023-02-10",
            "url": "https://apnews.com/article/pentagon-shoots-down-unknown-flying-object-175f9078d1df36e392b2956ba771001e"
        }
    ],
    "yukon-shootdown-2023": [
        {
            "type": "newspaper",
            "title": "AP: Trudeau Says US Fighter Shot Down Object Over Northern Canada",
            "publication": "Associated Press",
            "date": "2023-02-11",
            "url": "https://apnews.com/article/united-states-government-canada-ottawa-93071207f2bbdf93b591d6b40ce1cb5a"
        }
    ],
    "lake-huron-shootdown-2023": [
        {
            "type": "newspaper",
            "title": "AP: US Jets Down 4 Objects in 8 Days",
            "publication": "Associated Press",
            "date": "2023-02-12",
            "url": "https://apnews.com/article/biden-politics-charles-schumer-jake-sullivan-china-acc1a333326c50ee9649760c569c300f"
        }
    ],
    "uss-russell-2019": [
        {
            "type": "article",
            "title": "The War Zone: Pyramid-Shaped Objects Swarming Navy Destroyer",
            "publication": "The War Zone",
            "date": "2021-04-08",
            "url": "https://www.twz.com/40054/newly-released-video-shows-pyramid-shaped-objects-swarming-navy-destroyer"
        }
    ],
    "high-altitude-objects-2023": [
        {
            "type": "newspaper",
            "title": "AP: US Defends Decision to Shoot Down 3 Unidentified Objects",
            "publication": "Associated Press",
            "date": "2023-02-13",
            "url": "https://apnews.com/article/8d8b9e7474027e1305264b2c7b8b04fb"
        },
        {
            "type": "newspaper",
            "title": "The New York Times: US Shoots Down High-Altitude Object Over Alaska",
            "publication": "The New York Times",
            "date": "2023-02-10",
            "url": "https://www.nytimes.com/2023/02/10/us/politics/unidentified-object-shot-down-alaska.html"
        }
    ],
    "langley-drones-2023": [
        {
            "type": "newspaper",
            "title": "The Wall Street Journal: Drone Swarms Target US Military Bases",
            "publication": "The Wall Street Journal",
            "date": "2024-10-12",
            "url": "https://www.wsj.com/politics/national-security/drone-swarms-military-pentagon-defense-331871f4"
        }
    ],
    "bonilla-observation-1883": [
        {
            "type": "article",
            "title": "Universe Today: Was the First Photographed UFO a Comet?",
            "publication": "Universe Today",
            "date": "2011-10-14",
            "url": "https://www.universetoday.com/articles/was-the-first-photographed-ufo-a-comet"
        },
        {
            "type": "article",
            "title": "arXiv: Interpretation of the Observations Made by Bonilla in 1883",
            "publication": "arXiv",
            "date": "2011-10-12",
            "url": "https://arxiv.org/abs/1110.2798"
        }
    ],
    "uss-supply-1904": [
        {
            "type": "article",
            "title": "NICAP: Three Red Objects Sighted From USS Supply",
            "publication": "Monthly Weather Review via NICAP",
            "date": "1904-02-28",
            "url": "https://www.nicap.org/reports/040228supply_report.htm"
        }
    ],
    "airship-chicago-1897": [
        {
            "type": "article",
            "title": "Readex: The Great Airship Mystery of 1896-97",
            "publication": "Readex",
            "date": "2014-09-12",
            "url": "https://www.readex.com/blog/great-airship-mystery-1896-97"
        },
        {
            "type": "article",
            "title": "Skeptical Inquirer: The Great Airship Hoax",
            "publication": "Skeptical Inquirer",
            "date": "2009-11-01",
            "url": "https://skepticalinquirer.org/2009/11/the-great-airship-hoax/"
        }
    ],
    "nz-airship-1909": [
        {
            "type": "newspaper",
            "title": "New Zealand Times: The Mysterious Airship",
            "publication": "New Zealand Times",
            "date": "1909-08-02",
            "url": "https://paperspast.natlib.govt.nz/newspapers/NZTIM19090802.2.51"
        },
        {
            "type": "newspaper",
            "title": "Evening Post: The Airship Mystery",
            "publication": "Evening Post",
            "date": "1909-07-30",
            "url": "https://paperspast.natlib.govt.nz/newspapers/EP19090730.2.74"
        }
    ],
    "phantom-airship-uk-1909": [
        {
            "type": "article",
            "title": "Smithsonian Air & Space: Fear of Floating",
            "publication": "Air & Space Magazine",
            "date": "2009-05-01",
            "url": "https://www.smithsonianmag.com/air-space-magazine/fear-of-floating-137226392/"
        },
        {
            "type": "article",
            "title": "Airminded: Scareships",
            "publication": "Airminded",
            "date": "2009-05-13",
            "url": "https://airminded.org/2009/05/13/scareships/"
        }
    ],
    "maury-island-1947": [
        {
            "type": "newspaper",
            "title": "Vashon-Maury Island Beachcomber: The Maury Island Incident at 75",
            "publication": "Vashon-Maury Island Beachcomber",
            "date": "2022-06-15",
            "url": "https://www.vashonbeachcomber.com/news/the-maury-island-incident-at-75/"
        },
        {
            "type": "article",
            "title": "HistoryLink: Maury Island Incident",
            "publication": "HistoryLink",
            "date": "2021-06-21",
            "url": "https://www.historylink.org/File/2068"
        }
    ],
    "aztec-hoax-1948": [
        {
            "type": "newspaper",
            "title": "DGO Magazine: Aztec's Alien Connection",
            "publication": "DGO Magazine",
            "date": "2018-03-21",
            "url": "https://dgomag.com/aztecs-alien-connection/"
        },
        {
            "type": "article",
            "title": "FBI: UFOs and the Guy Hottel Memo",
            "publication": "FBI",
            "date": "2013-03-25",
            "url": "https://www.fbi.gov/news/stories/ufos-and-the-guy-hottel-memo"
        }
    ],
    "rio-de-janeiro-1952": [
        {
            "type": "article",
            "title": "NICAP: Barra da Tijuca UFO Photos",
            "publication": "NICAP",
            "date": "1952-05-07",
            "url": "https://www.nicap.org/barratijuca520507dir.htm"
        },
        {
            "type": "article",
            "title": "The Black Vault: Brazil Releases Barra da Tijuca Case File",
            "publication": "The Black Vault",
            "date": "2013-05-01",
            "url": "https://www.theblackvault.com/casefiles/ufo-case-files-of-brazil-barra-da-tijuca-ufo-photographs-may-7-1952/"
        }
    ],
    "valensole-1965": [
        {
            "type": "article",
            "title": "GEIPAN: Valensole Case File",
            "publication": "GEIPAN",
            "date": "1965-07-01",
            "url": "https://www.cnes-geipan.fr/fr/cas/1965-07-01488"
        },
        {
            "type": "article",
            "title": "UFO Evidence: Valensole Landing Case",
            "publication": "UFO Evidence",
            "date": "1965-07-01",
            "url": "http://www.ufoevidence.org/cases/case437.htm"
        }
    ],
    "mexico-city-1965": [
        {
            "type": "newspaper",
            "title": "O Dia: Another Report of a Flying Saucer",
            "publication": "O Dia",
            "date": "1965-08-25",
            "url": "https://ufologie.patrickgross.org/press/odia25aug1965.htm"
        }
    ],
    "portage-chase-1966": [
        {
            "type": "newspaper",
            "title": "Cleveland Scene: Portage County UFO Chase Remembered",
            "publication": "Cleveland Scene",
            "date": "2016-04-13",
            "url": "https://www.clevescene.com/news/the-portage-county-ufo-chase-is-50-years-old-this-week-4883064"
        },
        {
            "type": "newspaper",
            "title": "The Kent Stater: The UFO Chase",
            "publication": "The Kent Stater",
            "date": "1966-04-22",
            "url": "https://kentstater.com/7158/news/the-ufo-chase/"
        }
    ],
    "westall-australia-1966": [
        {
            "type": "newspaper",
            "title": "ABC News: The Westall UFO Mystery",
            "publication": "ABC News Australia",
            "date": "2026-04-06",
            "url": "https://www.abc.net.au/news/2026-04-06/the-westall-ufo-mystery-/106528518"
        },
        {
            "type": "newspaper",
            "title": "news.com.au: The Westall UFO Incident Still Remains a Mystery",
            "publication": "news.com.au",
            "date": "2016-04-06",
            "url": "https://www.news.com.au/technology/science/space/the-westall-ufo-incident-still-remains-a-mystery-50-years-after-it-occurred/news-story/f002a9da51358af2e9aca4b3d5cd81de"
        }
    ],
    "michalak-falcon-1967": [
        {
            "type": "newspaper",
            "title": "CBC News: Falcon Lake Incident Is Canada's Best-Documented UFO Case",
            "publication": "CBC News",
            "date": "2017-05-19",
            "url": "https://www.cbc.ca/news/canada/manitoba/falcon-lake-incident-book-anniversary-1.4121639"
        },
        {
            "type": "article",
            "title": "Library and Archives Canada: The Falcon Lake Incident",
            "publication": "Library and Archives Canada",
            "date": "2019-06-27",
            "url": "https://library-archives.canada.ca/eng/collection/engage-learn/podcast/Pages/falcon-lake-incident.aspx"
        }
    ],
    "amazon-1977": [
        {
            "type": "newspaper",
            "title": "Folha: Inside the 70-Year Military Investigation of Aliens in Brazil",
            "publication": "Folha de S.Paulo",
            "date": "2024-10-13",
            "url": "https://www1.folha.uol.com.br/internacional/en/brazil/2024/10/inside-the-70-year-military-investigation-of-aliens-in-brazil.shtml"
        }
    ],
    "colares-ufo-attacks-1977": [
        {
            "type": "newspaper",
            "title": "Folha: Inside the 70-Year Military Investigation of Aliens in Brazil",
            "publication": "Folha de S.Paulo",
            "date": "2024-10-13",
            "url": "https://www1.folha.uol.com.br/internacional/en/brazil/2024/10/inside-the-70-year-military-investigation-of-aliens-in-brazil.shtml"
        }
    ],
    "val-johnson-1979": [
        {
            "type": "newspaper",
            "title": "MPR News: 40 Years Later, Minnesota Deputy's UFO Story Still Draws Interest",
            "publication": "MPR News",
            "date": "2019-08-27",
            "url": "https://www.mprnews.org/story/2019/08/27/minnesota-ufo-sighting-val-johnson"
        },
        {
            "type": "article",
            "title": "Minnesota Historical Society: The Val Johnson Incident",
            "publication": "Minnesota Historical Society",
            "date": "2024-05-28",
            "url": "https://www.mnhs.org/blog/collectionsupclose/13699"
        }
    ],
    "clarenville-rcmp-1978": [
        {
            "type": "article",
            "title": "Canadian Coin News: RCMP's Third UFO Coin Features 1978 Clarenville Event",
            "publication": "Canadian Coin News",
            "date": "2020-10-06",
            "url": "https://canadiancoinnews.com/rcms-third-ufo-coin-features-1978-clarenville-event/"
        }
    ],
    "rendlesham-forest-1980": [
        {
            "type": "newspaper",
            "title": "BBC News: Rendlesham Forest UFO Incident Still Draws Questions",
            "publication": "BBC News",
            "date": "2020-12-26",
            "url": "https://www.bbc.com/news/uk-england-suffolk-54649675"
        },
        {
            "type": "newspaper",
            "title": "The Guardian: Revelations About Rendlesham Forest UFO Sighting",
            "publication": "The Guardian",
            "date": "2026-05-28",
            "url": "https://www.theguardian.com/world/2026/may/28/revelations-about-rendlesham-forest-ufo-sighting-must-not-be-covered-up-says-ex-head-of-mod-project"
        }
    ],
    "ohare-airport-2006": [
        {
            "type": "article",
            "title": "Wired: In the Sky! A Bird? A Plane? A UFO?",
            "publication": "Wired",
            "date": "2007-01-17",
            "url": "https://www.wired.com/2007/01/in-the-sky-a-bird-a-plane-a-ufo/"
        },
        {
            "type": "newspaper",
            "title": "WTTW: The 2006 O'Hare UFO Sighting That Launched Nationwide Interest",
            "publication": "WTTW",
            "date": "2025-02-20",
            "url": "https://interactive.wttw.com/playlist/2025/02/20/ohare-ufo"
        }
    ],
    "stephenville-texas-2008": [
        {
            "type": "newspaper",
            "title": "NPR: Dozens in Texas Town Report Seeing UFO",
            "publication": "NPR",
            "date": "2008-01-15",
            "url": "https://www.npr.org/templates/story/story.php?storyId=18146244"
        },
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Is the Stephenville UFO a Tall Tale?",
            "publication": "Los Angeles Times",
            "date": "2008-01-17",
            "url": "https://www.latimes.com/archives/la-xpm-2008-jan-17-na-ufo17-story.html"
        }
    ],
    "japanese-airlines-1987": [
        {
            "type": "article",
            "title": "FAA: Aircraft Accident Report and JAL 1628 UFO Files",
            "publication": "FAA via The Black Vault",
            "date": "1987-03-05",
            "url": "https://www.theblackvault.com/documentarchive/japan-air-lines-flight-1628-ufos/"
        }
    ],
    "varginha-brazil-1996": [
        {
            "type": "newspaper",
            "title": "The Wall Street Journal: A Brazilian City Has a Close Encounter",
            "publication": "The Wall Street Journal",
            "date": "1996-12-31",
            "url": "https://www.wsj.com/articles/SB852070075554464500"
        },
        {
            "type": "newspaper",
            "title": "G1: ET de Varginha Case Completes 20 Years",
            "publication": "G1",
            "date": "2016-01-20",
            "url": "https://g1.globo.com/mg/sul-de-minas/noticia/2016/01/et-de-varginha-caso-completa-20-anos-com-misterios-e-incertezas.html"
        }
    ],
    "aguadilla-puerto-rico-2013": [
        {
            "type": "newspaper",
            "title": "San Juan Daily Star: A Mysterious UFO Video Gained Attention",
            "publication": "The San Juan Daily Star",
            "date": "2025-09-22",
            "url": "https://www.sanjuandailystar.com/post/a-mysterious-ufo-video-gained-attention-when-the-puerto-rico-2024-uap-conference-showcased-an-up"
        },
        {
            "type": "article",
            "title": "SCU: Scientific Coalition for UAP Studies Aguadilla Report",
            "publication": "Scientific Coalition for UAP Studies",
            "date": "2015-08-01",
            "url": "https://www.explorescu.org/post/2015-aguadilla-puerto-rico"
        }
    ],
    "valparaiso-2014": [
        {
            "type": "newspaper",
            "title": "Newsweek: Chilean Navy Cannot Identify Mysterious Aircraft",
            "publication": "Newsweek",
            "date": "2017-01-13",
            "url": "https://www.newsweek.com/chilean-navy-id-mysterious-aircraft-caught-video-539786"
        }
    ],
    "chilean-navy-2014": [
        {
            "type": "newspaper",
            "title": "Newsweek: Chilean Navy Cannot Identify Mysterious Aircraft",
            "publication": "Newsweek",
            "date": "2017-01-13",
            "url": "https://www.newsweek.com/chilean-navy-id-mysterious-aircraft-caught-video-539786"
        }
    ],
    "calvine-ufo-1990": [
        {
            "type": "newspaper",
            "title": "The Guardian: Best UFO Picture Ever Found After 30 Years Missing",
            "publication": "The Guardian",
            "date": "2022-08-12",
            "url": "https://www.theguardian.com/world/2022/aug/12/best-ufo-picture-ever-calvine-photo-found-after-30-years-missing"
        }
    ],
    "rb47-radar-1957": [
        {
            "type": "article",
            "title": "NICAP: RB-47 Radar-Visual UFO Case",
            "publication": "NICAP",
            "date": "1957-07-17",
            "url": "https://www.nicap.org/reports/rb47case.htm"
        },
        {
            "type": "article",
            "title": "AIAA: Report on the UFO Wave of 1957",
            "publication": "American Institute of Aeronautics and Astronautics",
            "date": "1971-01-01",
            "url": "https://www.nicap.org/docs/rb47/AIAA-1971.pdf"
        }
    ],
    "papua-gill-1959": [
        {
            "type": "newspaper",
            "title": "Post-Courier: PNG's Most Sensational UFO Story",
            "publication": "Post-Courier",
            "date": "2024-08-24",
            "url": "https://www.postcourier.com.pg/pngs-most-sensational-ufo-story/"
        },
        {
            "type": "article",
            "title": "The Black Vault: Papua New Guinea, 1959 Father Gill Case",
            "publication": "The Black Vault",
            "date": "2019-01-01",
            "url": "https://www.theblackvault.com/casefiles/papua-new-guinea-1959-father-gill-ufo-case/"
        }
    ],
    "minot-b52-1968": [
        {
            "type": "article",
            "title": "Sign Oral History Project: Minot AFB UFO Case",
            "publication": "Sign Oral History Project",
            "date": "2018-10-24",
            "url": "https://sohp.us/collections/ufos-a-history/a-peaceful-skies-full-of-ufos/minot-afb-ufo-case/"
        },
        {
            "type": "article",
            "title": "Minot B-52 UFO Case Study",
            "publication": "MinotB52UFO.com",
            "date": "2005-01-01",
            "url": "https://minotb52ufo.com/"
        }
    ],
    "coyne-helicopter-1973": [
        {
            "type": "newspaper",
            "title": "Richland Source: Remembering the Coyne Helicopter UFO Incident",
            "publication": "Richland Source",
            "date": "2023-10-18",
            "url": "https://www.richlandsource.com/2023/10/18/remembering-the-coyne-helicopter-ufo-incident/"
        },
        {
            "type": "article",
            "title": "Ohio Magazine: Close Encounter",
            "publication": "Ohio Magazine",
            "date": "2023-10-01",
            "url": "https://www.ohiomagazine.com/ohio-life/article/close-encounter"
        }
    ],
    "allagash-abductions-1976": [
        {
            "type": "newspaper",
            "title": "The County: Allagash UFO Abduction Story Still Haunts Maine",
            "publication": "The County",
            "date": "2022-10-27",
            "url": "https://thecounty.me/2022/10/27/living/allagash-ufo-abduction-story-still-haunts-maine/"
        },
        {
            "type": "article",
            "title": "Bangor Daily News: Maine's Famous Allagash Alien Abduction",
            "publication": "Bangor Daily News",
            "date": "2016-10-31",
            "url": "https://www.bangordailynews.com/2016/10/31/news/maines-famous-allagash-alien-abduction/"
        }
    ],
    "belgian-wave-start-1989": [
        {
            "type": "article",
            "title": "The Week: The Belgian UFO Wave",
            "publication": "The Week",
            "date": "2024-06-19",
            "url": "https://theweek.com/culture-life/belgian-ufo-wave"
        },
        {
            "type": "article",
            "title": "Discovery UK: The Belgian UFO Wave",
            "publication": "Discovery UK",
            "date": "2024-04-12",
            "url": "https://www.discoveryuk.com/mysteries/the-belgian-ufo-wave-an-unsolved-mystery/"
        }
    ],
    "belgian-f16-intercept-1990": [
        {
            "type": "article",
            "title": "The Week: The Belgian UFO Wave",
            "publication": "The Week",
            "date": "2024-06-19",
            "url": "https://theweek.com/culture-life/belgian-ufo-wave"
        },
        {
            "type": "article",
            "title": "Discovery UK: The Belgian UFO Wave",
            "publication": "Discovery UK",
            "date": "2024-04-12",
            "url": "https://www.discoveryuk.com/mysteries/the-belgian-ufo-wave-an-unsolved-mystery/"
        }
    ],
    "mexico-eclipse-1991": [
        {
            "type": "newspaper",
            "title": "TIME: The Mexican Wave",
            "publication": "TIME",
            "date": "1991-08-19",
            "url": "https://time.com/archive/6718421/the-mexican-wave/"
        }
    ],
    "cosford-raf-1993": [
        {
            "type": "article",
            "title": "WhatDoTheyKnow: RAF Cosford/Shawbury UFO Documents",
            "publication": "WhatDoTheyKnow",
            "date": "2009-06-02",
            "url": "https://www.whatdotheyknow.com/request/ufo_sighting_raf_cosfordshawbury"
        },
        {
            "type": "article",
            "title": "The National Archives: UFO Records Released by the Ministry of Defence",
            "publication": "The National Archives",
            "date": "2013-06-21",
            "url": "https://webarchive.nationalarchives.gov.uk/ukgwa/20130621000000/http://ufos.nationalarchives.gov.uk/"
        }
    ],
    "norwegian-spiral-2009": [
        {
            "type": "newspaper",
            "title": "BBC News: Norway Spiral Was Failed Russian Missile Test",
            "publication": "BBC News",
            "date": "2009-12-10",
            "url": "http://news.bbc.co.uk/2/hi/europe/8405481.stm"
        },
        {
            "type": "article",
            "title": "Space.com: Spiral UFO Puzzles Norway",
            "publication": "Space.com",
            "date": "2009-12-09",
            "url": "https://www.space.com/7655-spiral-ufo-puzzles-norway.html"
        }
    ],
    "cometa-report-1999": [
        {
            "type": "article",
            "title": "Enigma Labs: The COMETA Report",
            "publication": "Enigma Labs",
            "date": "2023-09-01",
            "url": "https://enigmalabs.io/library/ed617158-b47e-4c62-9da8-1aef7e509aee"
        },
        {
            "type": "article",
            "title": "CUFOS: COMETA Report English Translation",
            "publication": "Center for UFO Studies",
            "date": "1999-07-01",
            "url": "https://cufos.org/PDFs/COMETA.pdf"
        }
    ],
    "france-cometa-cases-1999": [
        {
            "type": "article",
            "title": "Enigma Labs: The COMETA Report",
            "publication": "Enigma Labs",
            "date": "2023-09-01",
            "url": "https://enigmalabs.io/library/ed617158-b47e-4c62-9da8-1aef7e509aee"
        },
        {
            "type": "article",
            "title": "CUFOS: COMETA Report English Translation",
            "publication": "Center for UFO Studies",
            "date": "1999-07-01",
            "url": "https://cufos.org/PDFs/COMETA.pdf"
        }
    ],
    "fort-monmouth-radar-1951": [
        {
            "type": "article",
            "title": "NICAP: Fort Monmouth Radar Case Report",
            "publication": "NICAP",
            "date": "1951-09-10",
            "url": "https://www.nicap.org/reports/monmouth510910rep1.htm"
        },
        {
            "type": "article",
            "title": "NICAP: Fort Monmouth Case Continuation",
            "publication": "NICAP",
            "date": "1951-09-10",
            "url": "https://www.nicap.org/reports/monmouth510910rep2.htm"
        }
    ],
    "newhouse-tremonton-film-1952": [
        {
            "type": "article",
            "title": "NICAP: Tremonton Newhouse Film Report",
            "publication": "NICAP",
            "date": "1952-07-02",
            "url": "https://www.nicap.org/reports/520702tremonton_report1-2.htm"
        },
        {
            "type": "article",
            "title": "NICAP: Newhouse Film Analysis by Dr. Olmos",
            "publication": "NICAP",
            "date": "1952-07-02",
            "url": "https://www.nicap.org/reports/520702newhouse_olmos.htm"
        }
    ],
    "carson-sink-1952": [
        {
            "type": "article",
            "title": "NICAP: Carson Sink Encounter Report",
            "publication": "NICAP",
            "date": "1952-07-24",
            "url": "https://www.nicap.org/reports/520724carsonsink_report.htm"
        }
    ],
    "washington-national-1952-second": [
        {
            "type": "newspaper",
            "title": "The Washington Post: The Month That ET Came to DC",
            "publication": "The Washington Post",
            "date": "2012-07-20",
            "url": "https://www.washingtonpost.com/local/the-month-that-et-came-to-dc/2012/07/20/gJQAZp2ayW_story.html"
        }
    ],
    "lake-michigan-radar-1994": [
        {
            "type": "newspaper",
            "title": "MLive: Lake Michigan UFO Sightings Remain Unsolved",
            "publication": "MLive",
            "date": "2019-03-08",
            "url": "https://www.mlive.com/news/grand-rapids/2019/03/25-years-ago-ufo-sightings-over-lake-michigan-remain-unsolved.html"
        }
    ],
    "skinwalker-ranch-ongoing": [
        {
            "type": "newspaper",
            "title": "Deseret News: Frequent Fliers",
            "publication": "Deseret News",
            "date": "1996-06-30",
            "url": "https://www.deseret.com/1996/6/30/19251541/frequent-fliers/"
        },
        {
            "type": "article",
            "title": "HISTORY: Inside Skinwalker Ranch",
            "publication": "HISTORY",
            "date": "2023-10-03",
            "url": "https://www.history.com/news/skinwalker-ranch-paranormal-ufos-mutilation"
        }
    ],
    "canneto-caronia-fires-2004": [
        {
            "type": "newspaper",
            "title": "The Guardian: Mystery Fires Force Sicilian Village Evacuation",
            "publication": "The Guardian",
            "date": "2004-02-11",
            "url": "https://www.theguardian.com/world/2004/feb/11/italy.johnhooper"
        },
        {
            "type": "newspaper",
            "title": "The Sydney Morning Herald: Mystery Fires Force Sicilian Villagers to Flee",
            "publication": "The Sydney Morning Herald",
            "date": "2004-02-12",
            "url": "https://www.smh.com.au/world/mystery-fires-force-sicilian-villagers-to-flee-20040212-gdic6o.html"
        }
    ],
    "morristown-ufo-hoax-2009": [
        {
            "type": "newspaper",
            "title": "NJ.com: Morristown UFO Hoaxers Get Probation",
            "publication": "NJ.com",
            "date": "2009-04-07",
            "url": "https://www.nj.com/news/2009/04/morristown_ufo_hoaxers_get_pr.html"
        }
    ],
    "chicago-ufo-wave-": [
        {
            "type": "article",
            "title": "Wired: In the Sky! A Bird? A Plane? A UFO?",
            "publication": "Wired",
            "date": "2007-01-17",
            "url": "https://www.wired.com/2007/01/in-the-sky-a-bird-a-plane-a-ufo/"
        },
        {
            "type": "newspaper",
            "title": "WTTW: The 2006 O'Hare UFO Sighting That Launched Nationwide Interest",
            "publication": "WTTW",
            "date": "2025-02-20",
            "url": "https://interactive.wttw.com/playlist/2025/02/20/ohare-ufo"
        }
    ],
    "colorado-drone-swarm-2019": [
        {
            "type": "newspaper",
            "title": "The New York Times: The Mystery Drones Flying Over Colorado and Nebraska",
            "publication": "The New York Times",
            "date": "2020-01-01",
            "url": "https://www.nytimes.com/2020/01/01/us/drones-colorado-nebraska.html"
        },
        {
            "type": "newspaper",
            "title": "Colorado Public Radio: The Colorado Drone Mystery",
            "publication": "Colorado Public Radio",
            "date": "2020-01-06",
            "url": "https://www.cpr.org/2020/01/06/colorado-drone-mystery-nebraska/"
        }
    ],
    "disclosure-hearing-2023": [
        {
            "type": "article",
            "title": "House Oversight: Unidentified Anomalous Phenomena Hearing",
            "publication": "U.S. House Committee on Oversight and Accountability",
            "date": "2023-07-26",
            "url": "https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/"
        },
        {
            "type": "newspaper",
            "title": "Reuters: US House Panel Holds Hearing on UFOs",
            "publication": "Reuters",
            "date": "2023-07-26",
            "url": "https://www.reuters.com/world/us/us-congress-hold-hearing-uaps-ufos-2023-07-26/"
        }
    ],
    "pentagon-uap-videos-2020": [
        {
            "type": "article",
            "title": "Department of Defense: Release of Historical Navy Videos",
            "publication": "U.S. Department of Defense",
            "date": "2020-04-27",
            "url": "https://www.defense.gov/News/Releases/Release/Article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/"
        },
        {
            "type": "newspaper",
            "title": "The New York Times: Pentagon Officially Releases UFO Videos",
            "publication": "The New York Times",
            "date": "2020-04-28",
            "url": "https://www.nytimes.com/2020/04/28/us/pentagon-ufo-videos.html"
        }
    ],
    "uaptf-report-2021": [
        {
            "type": "article",
            "title": "ODNI: Preliminary Assessment on Unidentified Aerial Phenomena",
            "publication": "Office of the Director of National Intelligence",
            "date": "2021-06-25",
            "url": "https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf"
        },
        {
            "type": "newspaper",
            "title": "The New York Times: US Finds No Evidence of Alien Technology in Flying Objects",
            "publication": "The New York Times",
            "date": "2021-06-25",
            "url": "https://www.nytimes.com/2021/06/25/us/politics/ufo-report.html"
        }
    ],
    "lead-masks-1966": [
        {
            "type": "article",
            "title": "All That's Interesting: The Lead Masks Case",
            "publication": "All That's Interesting",
            "date": "2022-05-24",
            "url": "https://allthatsinteresting.com/lead-masks-case"
        },
        {
            "type": "article",
            "title": "PMIG: The Lead Masks Case",
            "publication": "Paranormal & Mysteries Investigation Group",
            "date": "2019-08-20",
            "url": "https://www.pmig.org/post/the-lead-masks-case"
        }
    ],
    "sao-paulo-night-1986": [
        {
            "type": "newspaper",
            "title": "Trove: UFOs Spotted Over Brazil",
            "publication": "Trove / The Canberra Times",
            "date": "1986-05-22",
            "url": "https://trove.nla.gov.au/newspaper/article/118126931"
        },
        {
            "type": "article",
            "title": "Gov.br: Noite Oficial dos OVNIs",
            "publication": "Brazilian Federal Government",
            "date": "2022-05-19",
            "url": "https://www.gov.br/arquivonacional/pt-br/assuntos/noticias/noite-oficial-dos-ovnis"
        }
    ],
    "emilcin-1978": [
        {
            "type": "article",
            "title": "Culture.pl: The Emilcin UFO Incident",
            "publication": "Culture.pl",
            "date": "2015-05-08",
            "url": "https://culture.pl/en/article/the-emilcin-ufo-incident"
        },
        {
            "type": "article",
            "title": "3 Seas Europe: Poland's Most Famous Alien Abduction",
            "publication": "3 Seas Europe",
            "date": "2023-06-20",
            "url": "https://3seaseurope.com/poland-ufo-alien-emilcin-abduction/"
        }
    ],
    "emilcin-abduction-1978": [
        {
            "type": "article",
            "title": "Culture.pl: The Emilcin UFO Incident",
            "publication": "Culture.pl",
            "date": "2015-05-08",
            "url": "https://culture.pl/en/article/the-emilcin-ufo-incident"
        },
        {
            "type": "article",
            "title": "3 Seas Europe: Poland's Most Famous Alien Abduction",
            "publication": "3 Seas Europe",
            "date": "2023-06-20",
            "url": "https://3seaseurope.com/poland-ufo-alien-emilcin-abduction/"
        }
    ],
    "kera-1972": [
        {
            "type": "article",
            "title": "Pink Tentacle: Mini UFO Captured in Kochi",
            "publication": "Pink Tentacle",
            "date": "2009-06-17",
            "url": "https://pinktentacle.com/2009/06/mini-ufo-captured-in-kochi/"
        },
        {
            "type": "article",
            "title": "TOCANA: Kera UFO Capture Case",
            "publication": "TOCANA",
            "date": "2017-09-01",
            "url": "https://tocana.jp/2017/09/post_14361_entry.html"
        }
    ],
    "spain-canary-1976": [
        {
            "type": "newspaper",
            "title": "La Voz de Canarias: The 1976 Canary Islands UFO Case",
            "publication": "La Voz de Canarias",
            "date": "2026-06-14",
            "url": "https://www.lavozdecanarias.com/the-1976-canary-islands-ufo-case-military-pilots-mysterious-orbs-and-a-government-cover-up/"
        },
        {
            "type": "article",
            "title": "UFO Evidence: Canary Islands Medical Case",
            "publication": "UFO Evidence",
            "date": "1976-06-22",
            "url": "http://www.ufoevidence.org/cases/case711.htm"
        }
    ],
    "germany-1990": [
        {
            "type": "article",
            "title": "MUFON-CES: The Greifswald Lights",
            "publication": "MUFON-CES",
            "date": "1990-08-24",
            "url": "https://mufon-ces.org/greifswald/"
        },
        {
            "type": "article",
            "title": "UAP Globe: Greifswald Lights",
            "publication": "UAP Globe",
            "date": "2026-06-14",
            "url": "https://uapglobe.com/1990-greifswald-lights-germany-ufo/"
        }
    ],
    "dudley-dorito-2007": [
        {
            "type": "newspaper",
            "title": "Talker News: The Dudley Dorito Witness Recounts the Sighting",
            "publication": "Talker News",
            "date": "2025-12-19",
            "url": "https://talker.news/2025/12/19/ufo-witness-relives-the-night-the-dudley-dorito-flew-over-her-home/"
        },
        {
            "type": "article",
            "title": "UFO Casebook: The Dudley Dorito",
            "publication": "UFO Casebook",
            "date": "2007-11-28",
            "url": "https://www.ufocasebook.com/dudleydorito.html"
        }
    ],
    "bentwaters-halt-memo-1980": [
        {
            "type": "newspaper",
            "title": "BBC News: Rendlesham Forest UFO Incident Still Draws Questions",
            "publication": "BBC News",
            "date": "2020-12-26",
            "url": "https://www.bbc.com/news/uk-england-suffolk-54649675"
        },
        {
            "type": "newspaper",
            "title": "The Guardian: Revelations About Rendlesham Forest UFO Sighting",
            "publication": "The Guardian",
            "date": "2026-05-28",
            "url": "https://www.theguardian.com/world/2026/may/28/revelations-about-rendlesham-forest-ufo-sighting-must-not-be-covered-up-says-ex-head-of-mod-project"
        }
    ],
    "jal1628-alaska-1986": [
        {
            "type": "article",
            "title": "FAA: Aircraft Accident Report and JAL 1628 UFO Files",
            "publication": "FAA via The Black Vault",
            "date": "1987-03-05",
            "url": "https://www.theblackvault.com/documentarchive/japan-air-lines-flight-1628-ufos/"
        }
    ],
    "gofast-2015": [
        {
            "type": "article",
            "title": "Department of Defense: Release of Historical Navy Videos",
            "publication": "U.S. Department of Defense",
            "date": "2020-04-27",
            "url": "https://www.defense.gov/News/Releases/Release/Article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/"
        },
        {
            "type": "newspaper",
            "title": "The New York Times: Glowing Auras and Black Money",
            "publication": "The New York Times",
            "date": "2017-12-16",
            "url": "https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html"
        }
    ],
    "roosevelt-uap-swarm-2019": [
        {
            "type": "newspaper",
            "title": "The Drive: Navy Releases UFO Videos and Documents from 2019 Encounters",
            "publication": "The War Zone / The Drive",
            "date": "2021-05-14",
            "url": "https://www.thedrive.com/the-war-zone/39913/navy-releases-ufo-videos-and-documents-from-2019-uss-roosevelt-encounters"
        },
        {
            "type": "newspaper",
            "title": "The New York Times: Navy Reports Describe UAP Encounters",
            "publication": "The New York Times",
            "date": "2019-05-26",
            "url": "https://www.nytimes.com/2019/05/26/us/politics/ufo-sightings-navy-pilots.html"
        }
    ],
    "mantell-incident-1948": [
        {
            "type": "article",
            "title": "NICAP: Mantell Case Analysis",
            "publication": "NICAP",
            "date": "1948-01-07",
            "url": "https://www.nicap.org/reports/480107mantell_sparks2.htm"
        },
        {
            "type": "article",
            "title": "NICAP: Mantell Oxygen Discussion",
            "publication": "NICAP",
            "date": "1948-01-07",
            "url": "https://www.nicap.org/reports/480107mantell_oxygen_thread.htm"
        }
    ],
    "kirtland-afb-1957": [
        {
            "type": "article",
            "title": "NICAP: Kirtland AFB Hynek File",
            "publication": "NICAP",
            "date": "1957-11-04",
            "url": "https://www.nicap.org/reports/kirtland57hyn.htm"
        },
        {
            "type": "article",
            "title": "NICAP: Kirtland AFB Duvall File",
            "publication": "NICAP",
            "date": "1957-11-04",
            "url": "https://www.nicap.org/reports/kirtland57duvall.htm"
        }
    ],
    "gordon-cooper-1957": [
        {
            "type": "newspaper",
            "title": "Courthouse News: Close Encounters of the Kern County Kind",
            "publication": "Courthouse News Service",
            "date": "2021-02-09",
            "url": "https://www.courthousenews.com/close-encounters-of-the-kern-county-kind/"
        },
        {
            "type": "article",
            "title": "UFO Evidence: Astronaut Gordon Cooper UFO Testimony",
            "publication": "UFO Evidence",
            "date": "1957-05-03",
            "url": "http://www.ufoevidence.org/cases/case892.htm"
        },
        {
            "type": "newspaper",
            "title": "ABC News Nightline: Former Astronaut Tells of UFO Experience",
            "publication": "ABC News",
            "date": "2007-07-11",
            "url": "https://abcnews.com/Nightline/story?id=3349575&page=1"
        }
    ],
    "gemini-4-ufo-1965": [
        {
            "type": "article",
            "title": "UFO Evidence: Gemini 4 UFO",
            "publication": "UFO Evidence",
            "date": "1965-06-04",
            "url": "http://www.ufoevidence.org/cases/case519.htm"
        },
        {
            "type": "article",
            "title": "UFO Evidence: McDivitt Gemini Object",
            "publication": "UFO Evidence",
            "date": "1965-06-04",
            "url": "http://www.ufoevidence.org/cases/case520.htm"
        }
    ],
    "cussac-1967": [
        {
            "type": "article",
            "title": "UFO Evidence: Close Encounter at Cussac",
            "publication": "UFO Evidence",
            "date": "1967-08-29",
            "url": "http://www.ufoevidence.org/cases/case865.htm"
        },
        {
            "type": "newspaper",
            "title": "PhillyBurbs: This UFO Incident in France Is Still Unexplained",
            "publication": "PhillyBurbs",
            "date": "2010-10-07",
            "url": "https://www.phillyburbs.com/story/lifestyle/2010/10/07/this-ufo-incident-in-france/17869373007/"
        }
    ],
    "arequipa-peru-1980": [
        {
            "type": "article",
            "title": "UFO Evidence: Peruvian Fighter Pilot Fires on UFO",
            "publication": "UFO Evidence",
            "date": "1980-04-11",
            "url": "http://www.ufoevidence.org/cases/case63.htm"
        },
        {
            "type": "article",
            "title": "UFO Evidence: Oscar Santa Maria Huertas Encounter",
            "publication": "UFO Evidence",
            "date": "1980-04-11",
            "url": "http://www.ufoevidence.org/cases/case678.htm"
        },
        {
            "type": "newspaper",
            "title": "The Guardian: Peru Reopens UFO Investigations Office",
            "publication": "The Guardian",
            "date": "2013-10-27",
            "url": "https://www.theguardian.com/world/2013/oct/27/peru-ufo-investigations-office-reopening"
        },
        {
            "type": "article",
            "title": "The Epoch Times: Peruvian Jet Pilot Tells of Tangle With UFO",
            "publication": "The Epoch Times",
            "date": "2013-05-15",
            "url": "https://www.theepochtimes.com/article/peruvian-jet-pilot-tells-of-tangle-with-ufo-37316"
        }
    ],
    "italy-rome-1954": [
        {
            "type": "newspaper",
            "title": "BBC News: The Day UFOs Stopped Play",
            "publication": "BBC News",
            "date": "2014-10-24",
            "url": "https://www.bbc.com/news/magazine-29342407"
        }
    ],
    "turin-1973": [
        {
            "type": "article",
            "title": "UFO Evidence: Turin Close Encounter",
            "publication": "UFO Evidence",
            "date": "1973-12-06",
            "url": "http://www.ufoevidence.org/cases/case457.htm"
        }
    ],
    "poland-1959": [
        {
            "type": "article",
            "title": "UFO Evidence: Gdynia Harbor Object",
            "publication": "UFO Evidence",
            "date": "1959-01-21",
            "url": "http://www.ufoevidence.org/cases/case821.htm"
        }
    ],
    "kofu-1975": [
        {
            "type": "article",
            "title": "UFO Evidence: Kofu Incident",
            "publication": "UFO Evidence",
            "date": "1975-02-23",
            "url": "http://www.ufoevidence.org/cases/case648.htm"
        }
    ],
    "china-airport-closures-2010": [
        {
            "type": "newspaper",
            "title": "ABC News: UFO in China Closes Airport and Prompts Investigation",
            "publication": "ABC News",
            "date": "2010-07-14",
            "url": "https://abcnews.go.com/International/ufo-china-closes-airport-prompts-investigation/story?id=11159531"
        }
    ],
    "washington-state-2019": [
        {
            "type": "newspaper",
            "title": "The New York Times: Navy Reports Describe UAP Encounters",
            "publication": "The New York Times",
            "date": "2019-05-26",
            "url": "https://www.nytimes.com/2019/05/26/us/politics/ufo-sightings-navy-pilots.html"
        }
    ],
    "meng-zhaoguo-1994": [
        {
            "type": "article",
            "title": "UFO Evidence: Meng Zhaoguo Abduction Case",
            "publication": "UFO Evidence",
            "date": "1994-06-01",
            "url": "http://www.ufoevidence.org/cases/case808.htm"
        }
    ],
    "seoul-1976": [
        {
            "type": "newspaper",
            "title": "The Korea Times: UFOs Over Seoul in 1976",
            "publication": "The Korea Times",
            "date": "2024-06-14",
            "url": "https://www.koreatimes.co.kr/www/nation/2024/06/113_216059.html"
        },
        {
            "type": "article",
            "title": "UFO Evidence: Seoul Anti-Air Barrage",
            "publication": "UFO Evidence",
            "date": "1976-10-14",
            "url": "http://www.ufoevidence.org/cases/case967.htm"
        }
    ],
    "ladakh-2013": [
        {
            "type": "newspaper",
            "title": "India Today: UFOs Over India-China Border in Ladakh",
            "publication": "India Today",
            "date": "2013-01-06",
            "url": "https://www.indiatoday.in/india/north/story/ufos-india-china-border-ladakh-army-150559-2013-01-06"
        }
    ],
    "nuforc-2023-vegas": [
        {
            "type": "newspaper",
            "title": "NBC News: Las Vegas Family Claims Aliens Were in Their Backyard",
            "publication": "NBC News",
            "date": "2023-06-12",
            "url": "https://www.nbcnews.com/news/us-news/las-vegas-family-claims-aliens-backyard-police-investigate-rcna89236"
        },
        {
            "type": "newspaper",
            "title": "8 News Now: Las Vegas Police Bodycam Captures Bright Light",
            "publication": "8 News Now",
            "date": "2023-06-07",
            "url": "https://www.8newsnow.com/investigators/las-vegas-police-bodycam-captures-bright-light-falling-from-sky-family-claims-to-see-aliens/"
        }
    ],
    "tulli-papyrus-1450bc": [
        {
            "type": "article",
            "title": "Condon Report: Ancient Astronaut and Historical UFO Claims",
            "publication": "University of Colorado / NCAS",
            "date": "1968",
            "url": "https://files.ncas.org/condon/text/s5chap01.htm"
        },
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        }
    ],
    "thutmose-stele-1450bc": [
        {
            "type": "article",
            "title": "Condon Report: Ancient Astronaut and Historical UFO Claims",
            "publication": "University of Colorado / NCAS",
            "date": "1968",
            "url": "https://files.ncas.org/condon/text/s5chap01.htm"
        }
    ],
    "roman-prodigies-218bc": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        },
        {
            "type": "article",
            "title": "Imperium Romanum: Ancient Roman References to Strange Sky Objects",
            "publication": "Imperium Romanum",
            "date": "2021-05-22",
            "url": "https://imperiumromanum.pl/en/curiosities/first-mention-of-ufos-from-time-of-romans/"
        }
    ],
    "roman-ships-218bc": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        },
        {
            "type": "article",
            "title": "Imperium Romanum: Ancient Roman References to Strange Sky Objects",
            "publication": "Imperium Romanum",
            "date": "2021-05-22",
            "url": "https://imperiumromanum.pl/en/curiosities/first-mention-of-ufos-from-time-of-romans/"
        }
    ],
    "roman-lanuvium-173bc": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        }
    ],
    "plutarch-battle-74bc": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        }
    ],
    "flame-wine-jar-73bc": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        }
    ],
    "pliny-spark-76bc": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        }
    ],
    "josephus-chariots-66ad": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        },
        {
            "type": "article",
            "title": "Condon Report: Ancient Astronaut and Historical UFO Claims",
            "publication": "University of Colorado / NCAS",
            "date": "1968",
            "url": "https://files.ncas.org/condon/text/s5chap01.htm"
        }
    ],
    "josephus-sky-army-65ad": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        },
        {
            "type": "article",
            "title": "Condon Report: Ancient Astronaut and Historical UFO Claims",
            "publication": "University of Colorado / NCAS",
            "date": "1968",
            "url": "https://files.ncas.org/condon/text/s5chap01.htm"
        }
    ],
    "roman-angel-hair-196ad": [
        {
            "type": "article",
            "title": "Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal",
            "date": "2007",
            "url": "https://knuthlab.org/library/stothers-2007---ufos-in-antiquity.pdf"
        }
    ],
    "korea-ufo-1609": [
        {
            "type": "article",
            "title": "K-Occult: The 1609 Gangwon UFO",
            "publication": "K-Occult",
            "date": "2025-07-21",
            "url": "https://koccult.com/mysteries/1609-gangwon-ufo"
        },
        {
            "type": "article",
            "title": "Dong-A Science: Historical Korean UFO Records",
            "publication": "Dong-A Science",
            "date": "2020-06-03",
            "url": "https://www.dongascience.com/en/news/3572"
        },
        {
            "type": "article",
            "title": "LA Seoulite: UFO Sightings in Old Joseon",
            "publication": "LA Seoulite",
            "date": "2021-06-24",
            "url": "https://laseoulite.substack.com/p/ufo-sightings-in-old-joseon"
        }
    ],
    "byland-abbey-1290": [
        {
            "type": "article",
            "title": "Jason Colavito: The Byland Abbey UFO Sighting, Anatomy of a Hoax",
            "publication": "Jason Colavito",
            "date": "2016-02-28",
            "url": "https://www.jasoncolavito.com/blog/the-byland-abbey-ufo-sighting-anatomy-of-a-hoax"
        },
        {
            "type": "article",
            "title": "UK Hansard: Unidentified Flying Objects Debate Mentions Byland Abbey",
            "publication": "UK Parliament Hansard",
            "date": "1979-01-18",
            "url": "https://api.parliament.uk/historic-hansard/lords/1979/jan/18/unidentified-flying-objects"
        }
    ],
    "widecombe-thunderstorm-1638": [
        {
            "type": "article",
            "title": "Early Modern Scribbling: Piecing Together the 1638 Widecombe Storm Story",
            "publication": "Early Modern Scribbling",
            "date": "2023-02-06",
            "url": "https://earlymodernscribbling.com/2023/02/06/piecing-together-the-story-a-case-study-in-17th-century-news-reporting/"
        },
        {
            "type": "article",
            "title": "Devon Heritage: Widecombe, The Great Storm of 1638",
            "publication": "Devon Heritage",
            "date": "2005",
            "url": "https://www.devonheritage.org/Places/Widecombe/Wideombe-TheGreatStormof1638.htm"
        }
    ],
    "japan-koza-1803": [
        {
            "type": "article",
            "title": "Public Domain Review: Utsuro-bune, Edo Period Images of a Hollow Ship",
            "publication": "The Public Domain Review",
            "date": "2021-03-10",
            "url": "https://publicdomainreview.org/collection/utsuro-bune"
        }
    ],
    "utsuro-bune-1803": [
        {
            "type": "article",
            "title": "Public Domain Review: Utsuro-bune, Edo Period Images of a Hollow Ship",
            "publication": "The Public Domain Review",
            "date": "2021-03-10",
            "url": "https://publicdomainreview.org/collection/utsuro-bune"
        }
    ],
    "maracaibo-incident-1886": [
        {
            "type": "newspaper",
            "title": "Scientific American Archive: A Curious Phenomenon in Venezuela",
            "publication": "Scientific American",
            "date": "1886-12-18",
            "url": "https://archive.org/details/scientific-american-1886-12-18"
        },
        {
            "type": "article",
            "title": "Physics Forums: Scientific American Maracaibo Account Discussion",
            "publication": "Physics Forums",
            "date": "2011-06-13",
            "url": "https://www.physicsforums.com/threads/a-curious-phenomenon-in-venezuela-scientific-american-dec-18th-1886.492074/"
        }
    ],
    "alexander-tyre-329bc": [
        {
            "type": "article",
            "title": "UFO Evidence: Alexander the Great's Flying Shields",
            "publication": "UFO Evidence",
            "date": "-329",
            "url": "http://www.ufoevidence.org/cases/case491.htm"
        },
        {
            "type": "article",
            "title": "Listverse: UFO Sightings That Pre-Date the 1900s",
            "publication": "Listverse",
            "date": "2016-04-05",
            "url": "https://listverse.com/2016/04/05/10-ufo-sightings-that-pre-date-the-1900s/"
        }
    ],
    "japanese-azuma-1235": [
        {
            "type": "article",
            "title": "Disclosure HK: Obscure Japan, 1235 UFO Account",
            "publication": "Disclosure HK",
            "date": "2021-04-21",
            "url": "https://disclosurehk.com/blog/ufo-obscure-japan-1235/"
        },
        {
            "type": "article",
            "title": "Listverse: UFO Sightings That Pre-Date the 1900s",
            "publication": "Listverse",
            "date": "2016-04-05",
            "url": "https://listverse.com/2016/04/05/10-ufo-sightings-that-pre-date-the-1900s/"
        }
    ],
    "japan-sky-battle-1235": [
        {
            "type": "article",
            "title": "Disclosure HK: Obscure Japan, 1235 UFO Account",
            "publication": "Disclosure HK",
            "date": "2021-04-21",
            "url": "https://disclosurehk.com/blog/ufo-obscure-japan-1235/"
        },
        {
            "type": "article",
            "title": "Listverse: UFO Sightings That Pre-Date the 1900s",
            "publication": "Listverse",
            "date": "2016-04-05",
            "url": "https://listverse.com/2016/04/05/10-ufo-sightings-that-pre-date-the-1900s/"
        }
    ],
    "roerich-tibet-1926": [
        {
            "type": "article",
            "title": "NICAP: Nicholas Roerich Himalayas Sighting",
            "publication": "NICAP",
            "date": "1927-08-05",
            "url": "https://www.nicap.org/270805himalayasdir.htm"
        },
        {
            "type": "article",
            "title": "Nicholas Roerich Museum: Altai-Himalaya Writings",
            "publication": "Nicholas Roerich Museum",
            "date": "1929",
            "url": "https://www.roerich.org/roerich-writings-altai-himalaya.php"
        }
    ],
    "albania-ufo-1907": [
        {
            "type": "newspaper",
            "title": "Koha: Cerciz Topulli's Eagles in UFO Migrations",
            "publication": "Koha",
            "date": "2023-10-14",
            "url": "https://www.koha.net/en/shtojca-kulture/393304/shqiponjat-e-cerces-ne-shtegtime-ufo-sh"
        }
    ],
    "china-1981": [
        {
            "type": "newspaper",
            "title": "UPI Archive: Unidentified Flying Object Reported by Chinese News Agency",
            "publication": "United Press International",
            "date": "1981-09-11",
            "url": "https://www.upi.com/Archives/1981/09/11/The-official-Chinese-news-agency-said-today-an-unidentified/2705369028800/"
        },
        {
            "type": "newspaper",
            "title": "Sixth Tone: China's Long UFO Fascination",
            "publication": "Sixth Tone",
            "date": "2023-05-19",
            "url": "https://www.sixthtone.com/news/1012934"
        },
        {
            "type": "article",
            "title": "The World of Chinese: Inside China's Alien Hunters",
            "publication": "The World of Chinese",
            "date": "2022-06-23",
            "url": "https://www.theworldofchinese.com/2022/06/close-encounters-inside-the-curious-world-of-chinas-alien-hunters/"
        }
    ],
    "salyut-6-1981": [
        {
            "type": "article",
            "title": "Room: Fireflies and Saucers",
            "publication": "Room Space Journal",
            "date": "2021-02-01",
            "url": "https://room.eu.com/article/fireflies-and-saucers"
        },
        {
            "type": "article",
            "title": "Gateway to Russia: What Did Soviet and Russian Cosmonauts Think About UFOs?",
            "publication": "Gateway to Russia",
            "date": "2023-07-04",
            "url": "https://www.gw2ru.com/lifestyle/3128-cosmonauts-think-ufo"
        }
    ],
    "japanese-object-619ad": [
        {
            "type": "newspaper",
            "title": "The Diplomat: A Brief History of UFOs in Japan",
            "publication": "The Diplomat",
            "date": "2021-07-15",
            "url": "https://thediplomat.com/2021/07/a-brief-history-of-ufos-in-japan/"
        },
        {
            "type": "article",
            "title": "Nippon.com: Japan's Long History of Strange Sky Objects",
            "publication": "Nippon.com",
            "date": "2020-06-19",
            "url": "https://www.nippon.com/en/japan-topics/g00879/"
        }
    ],
    "japanese-light-sources-900ad": [
        {
            "type": "newspaper",
            "title": "The Diplomat: A Brief History of UFOs in Japan",
            "publication": "The Diplomat",
            "date": "2021-07-15",
            "url": "https://thediplomat.com/2021/07/a-brief-history-of-ufos-in-japan/"
        },
        {
            "type": "article",
            "title": "Nippon.com: Japan's Long History of Strange Sky Objects",
            "publication": "Nippon.com",
            "date": "2020-06-19",
            "url": "https://www.nippon.com/en/japan-topics/g00879/"
        }
    ],
    "japan-kochi-1988": [
        {
            "type": "newspaper",
            "title": "CBS News: Japan Named a UAP Hotspot",
            "publication": "CBS News",
            "date": "2023-09-06",
            "url": "https://www.cbsnews.com/news/ufo-investigation-japan-us-says-region-hotspot-uap-sightings/"
        },
        {
            "type": "newspaper",
            "title": "The Diplomat: A Brief History of UFOs in Japan",
            "publication": "The Diplomat",
            "date": "2021-07-15",
            "url": "https://thediplomat.com/2021/07/a-brief-history-of-ufos-in-japan/"
        }
    ],
    "tokyo-2003": [
        {
            "type": "newspaper",
            "title": "The Straits Times: Mysterious UFO Captures Imaginations in Japan",
            "publication": "The Straits Times",
            "date": "2020-06-19",
            "url": "https://www.straitstimes.com/asia/east-asia/mysterious-ufo-captures-imaginations-in-japan"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Japan Named a UAP Hotspot",
            "publication": "CBS News",
            "date": "2023-09-06",
            "url": "https://www.cbsnews.com/news/ufo-investigation-japan-us-says-region-hotspot-uap-sightings/"
        }
    ],
    "welsh-sky-battle-1034ad": [
        {
            "type": "article",
            "title": "Rebekah King: Did Medieval People Tell Stories About Aliens?",
            "publication": "Rebekah King",
            "date": "2023-07-05",
            "url": "https://rebekahkingwriter.substack.com/p/did-medieval-people-tell-stories"
        }
    ],
    "milan-crosses-1347": [
        {
            "type": "article",
            "title": "Rebekah King: Did Medieval People Tell Stories About Aliens?",
            "publication": "Rebekah King",
            "date": "2023-07-05",
            "url": "https://rebekahkingwriter.substack.com/p/did-medieval-people-tell-stories"
        },
        {
            "type": "article",
            "title": "Early Modern Scribbling: Early Modern UFOs",
            "publication": "Early Modern Scribbling",
            "date": "2021-06-08",
            "url": "https://earlymodernscribbling.com/2021/06/08/early-modern-ufos/"
        }
    ],
    "arras-burning-wheel-1461": [
        {
            "type": "article",
            "title": "Rebekah King: Did Medieval People Tell Stories About Aliens?",
            "publication": "Rebekah King",
            "date": "2023-07-05",
            "url": "https://rebekahkingwriter.substack.com/p/did-medieval-people-tell-stories"
        },
        {
            "type": "article",
            "title": "Early Modern Scribbling: Early Modern UFOs",
            "publication": "Early Modern Scribbling",
            "date": "2021-06-08",
            "url": "https://earlymodernscribbling.com/2021/06/08/early-modern-ufos/"
        }
    ],
    "mexico-armada-1697": [
        {
            "type": "article",
            "title": "Early Modern Scribbling: Early Modern UFOs",
            "publication": "Early Modern Scribbling",
            "date": "2021-06-08",
            "url": "https://earlymodernscribbling.com/2021/06/08/early-modern-ufos/"
        }
    ],
    "chilean-navy-1868": [
        {
            "type": "newspaper",
            "title": "Vice: Alien Hunting on Chile's UFO Route",
            "publication": "Vice",
            "date": "2015-12-07",
            "url": "https://www.vice.com/en/article/i-went-alien-hunting-on-chile-ufo-route/"
        },
        {
            "type": "article",
            "title": "Chile Travel: Ufology in Chile",
            "publication": "Chile Travel",
            "date": "2021-11-30",
            "url": "https://chile.travel/en/blog/ufology-in-chile-the-best-destinations-for-the-sighting-of-ufos-2/"
        }
    ],
    "buenos-aires-1965": [
        {
            "type": "article",
            "title": "Discovery UK: Signal From the South, Argentina UFOs",
            "publication": "Discovery UK",
            "date": "2026-02-23",
            "url": "https://www.discoveryuk.com/mysteries/signal-from-the-south-argentina-ufos/"
        },
        {
            "type": "article",
            "title": "Granger: UFOs Over Buenos Aires at Night",
            "publication": "Granger",
            "date": "1965",
            "url": "https://www.granger.com/0100660-ufo-argentina-1965-two-ufos-seen-over-buenos-aires-at-night-image.html"
        }
    ],
    "bariloche-2003": [
        {
            "type": "newspaper",
            "title": "Buenos Aires Times: Bariloche Sighting Cited in Newly Released Pentagon Files",
            "publication": "Buenos Aires Times",
            "date": "2026-05-16",
            "url": "https://www.batimes.com.ar/news/world/bariloche-sighting-cited-in-newly-released-pentagon-files-on-ufos.phtml"
        },
        {
            "type": "article",
            "title": "Discovery UK: Signal From the South, Argentina UFOs",
            "publication": "Discovery UK",
            "date": "2026-02-23",
            "url": "https://www.discoveryuk.com/mysteries/signal-from-the-south-argentina-ufos/"
        }
    ],
    "santiago-chile-1988": [
        {
            "type": "newspaper",
            "title": "Vice: Alien Hunting on Chile's UFO Route",
            "publication": "Vice",
            "date": "2015-12-07",
            "url": "https://www.vice.com/en/article/i-went-alien-hunting-on-chile-ufo-route/"
        },
        {
            "type": "article",
            "title": "Chile Travel: Ufology in Chile",
            "publication": "Chile Travel",
            "date": "2021-11-30",
            "url": "https://chile.travel/en/blog/ufology-in-chile-the-best-destinations-for-the-sighting-of-ufos-2/"
        },
        {
            "type": "article",
            "title": "IFLScience: Chilean Government Releases Unexplainable UFO Video",
            "publication": "IFLScience",
            "date": "2017-01-09",
            "url": "https://www.iflscience.com/chilean-government-releases-an-unexplainable-ufo-sighting-video-39751"
        }
    ],
    "atacama-desert-2000": [
        {
            "type": "newspaper",
            "title": "Fox News: Chile Investigates UFO Sighting in the Atacama Desert",
            "publication": "Fox News",
            "date": "2014-07-10",
            "url": "https://www.foxnews.com/lifestyle/chile-investigates-ufo-sighting-in-the-atacama-desert-definitely-not-a-drone"
        },
        {
            "type": "article",
            "title": "ESO Messenger: Unidentified Object Over Chilean Observatory",
            "publication": "European Southern Observatory",
            "date": "1992",
            "url": "https://www.eso.org/sci/publications/messenger/archive/no.67-mar92/messenger-no67-56-57.pdf"
        }
    ],
    "ezekiel-wheel-593bc": [
        {
            "type": "article",
            "title": "Christian Courier: Does the Bible Refer to UFOs?",
            "publication": "Christian Courier",
            "date": "2000",
            "url": "https://christiancourier.com/articles/does-the-bible-refer-to-ufos"
        }
    ],
    "anglo-saxon-dragons-793ad": [
        {
            "type": "article",
            "title": "Avalon Project: The Anglo-Saxon Chronicle, 793 Entry",
            "publication": "Yale Law School Avalon Project",
            "date": "1998",
            "url": "https://avalon.law.yale.edu/medieval/ang08.asp"
        },
        {
            "type": "article",
            "title": "Dragons in the Sky: Medieval Dragon Accounts",
            "publication": "University of Oxford",
            "date": "2006",
            "url": "https://users.ox.ac.uk/~stuart/dits/main.html"
        }
    ],
    "irish-airships-842ad": [
        {
            "type": "article",
            "title": "JSTOR Daily: Ireland's Upper Sea",
            "publication": "JSTOR Daily",
            "date": "2020-03-17",
            "url": "https://daily.jstor.org/irelands-upper-sea/"
        },
        {
            "type": "article",
            "title": "Material Culture Review: Ships in the Air",
            "publication": "Material Culture Review",
            "date": "2003",
            "url": "https://journals.lib.unb.ca/index.php/MCR/article/view/17808/22180"
        }
    ],
    "irish-airship-740ad": [
        {
            "type": "article",
            "title": "JSTOR Daily: Ireland's Upper Sea",
            "publication": "JSTOR Daily",
            "date": "2020-03-17",
            "url": "https://daily.jstor.org/irelands-upper-sea/"
        },
        {
            "type": "article",
            "title": "Material Culture Review: Ships in the Air",
            "publication": "Material Culture Review",
            "date": "2003",
            "url": "https://journals.lib.unb.ca/index.php/MCR/article/view/17808/22180"
        }
    ],
    "frankish-shields-776ad": [
        {
            "type": "article",
            "title": "EsoterX: Charlemagne and Frankish Encounters With UFOs",
            "publication": "EsoterX",
            "date": "2017-01-01",
            "url": "https://esoterx.com/2017/01/01/charlemagne-frank-encounters-with-ufos/"
        }
    ],
    "columbus-light-1492": [
        {
            "type": "article",
            "title": "HandWiki: 1492 Light Sighting",
            "publication": "HandWiki",
            "date": "2024",
            "url": "https://handwiki.org/wiki/Earth%3A1492_light_sighting"
        },
        {
            "type": "article",
            "title": "The Generalist Academy: Columbus' UFO",
            "publication": "The Generalist Academy",
            "date": "2019-04-05",
            "url": "https://generalist.academy/2019/04/05/columbus-ufo/"
        }
    ],
    "halley-sighting-1676": [
        {
            "type": "article",
            "title": "Think About It Docs: Edmund Halley Sees UFO in 1676",
            "publication": "Think About It Docs",
            "date": "2017",
            "url": "https://thinkaboutitdocs.com/edmund-halley-sees-ufo-in-1676/"
        }
    ],
    "smythe-everest-1933": [
        {
            "type": "article",
            "title": "Himalayan Journal: The Climbing Partner and Other Experience in the Himalaya",
            "publication": "The Himalayan Club",
            "date": "1993",
            "url": "https://www.himalayanclub.org/hj/49/16/the-climbing-partner-the-other-experience-in-the-himalaya/"
        }
    ],
    "angelholm-sweden-1946": [
        {
            "type": "article",
            "title": "Guidebook Sweden: UFO Monument in Angelholm",
            "publication": "Guidebook Sweden",
            "date": "2024",
            "url": "https://www.guidebook-sweden.com/en/guidebook/destination/ufo-monumentet-ufo-monument-in-aengelholm"
        }
    ],
    "wonsan-sunchon-1952": [
        {
            "type": "article",
            "title": "Project 1947: Korean War UFO Reports",
            "publication": "Project 1947",
            "date": "2001",
            "url": "https://www.project1947.com/fig/korea52a.htm"
        }
    ],
    "betty-andreasson-1967": [
        {
            "type": "article",
            "title": "Internet Archive: The Andreasson Affair",
            "publication": "Internet Archive",
            "date": "1979",
            "url": "https://archive.org/details/andreassonaffair0000fowl"
        },
        {
            "type": "newspaper",
            "title": "Boston Magazine: Alien Encounters in Massachusetts",
            "publication": "Boston Magazine",
            "date": "2015-04-28",
            "url": "https://www.bostonmagazine.com/news/2015/04/28/alien-encounters-in-massachusetts/"
        },
        {
            "type": "article",
            "title": "Encyclopedia.com: Betty Andreasson",
            "publication": "Encyclopedia.com",
            "date": "2024",
            "url": "https://www.encyclopedia.com/science/encyclopedias-almanacs-transcripts-and-maps/andreasson-betty"
        }
    ],
    "morocco-1976": [
        {
            "type": "newspaper",
            "title": "Foreign Policy: The Soviet Space Junk That Became a Moroccan UFO",
            "publication": "Foreign Policy",
            "date": "2013-04-11",
            "url": "https://foreignpolicy.com/2013/04/11/wikileaked-the-soviet-space-junk-that-became-a-moroccan-ufo/"
        }
    ],
    "persian-ufo-2004": [
        {
            "type": "newspaper",
            "title": "The National Interest: Iranian F-14s and an Inexplicable UFO Sighting",
            "publication": "The National Interest",
            "date": "2021-09-12",
            "url": "https://nationalinterest.org/blog/reboot/ufo-sighting-irans-f-14-tomcats-once-had-something-inexplicable-their-sights-192708"
        },
        {
            "type": "article",
            "title": "The Aviationist: Iranian F-14 Tomcat Versus UFO",
            "publication": "The Aviationist",
            "date": "2013-11-10",
            "url": "https://theaviationist.com/2013/11/10/f-14-vs-ufo/"
        }
    ],
    "chinese-military-ufo-2021": [
        {
            "type": "article",
            "title": "Army AL&T: The Real Meaning Behind China's Viral UFO Video",
            "publication": "Army AL&T",
            "date": "2021-09-23",
            "url": "https://alx.army.mil/Article-Library/View-Content/ArtMID/394/ArticleID/2065/The-Real-Meaning-Behind-China%E2%80%99s-Viral-UFO-Video"
        }
    ],
    "puebla-1994": [
        {
            "type": "newspaper",
            "title": "Latin Times: UFO at Mexican Volcano?",
            "publication": "Latin Times",
            "date": "2013-06-03",
            "url": "https://www.latintimes.com/ufo-mexican-volcano-does-video-footage-show-ufo-entering-mexicos-popocatepetl-volcano-video-127938"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Popocatepetl Volcano Erupting in Dramatic Explosions",
            "publication": "CBS News",
            "date": "2012-04-20",
            "url": "https://www.cbsnews.com/sanfrancisco/news/mexican-volcano-erupting-in-dramatic-explosions-of-lava-rock-ash/"
        },
        {
            "type": "article",
            "title": "Ancient Origins: UFO Entering Volcano in Mexico",
            "publication": "Ancient Origins",
            "date": "2013-06-01",
            "url": "https://www.ancient-origins.net/news-mysterious-phenomena/ufo-entering-volcano-mexico-00527"
        }
    ],
    "lima-1974": [
        {
            "type": "newspaper",
            "title": "The Guardian: Peru Reopens UFO Investigations Office",
            "publication": "The Guardian",
            "date": "2013-10-27",
            "url": "https://www.theguardian.com/world/2013/oct/27/peru-ufo-investigations-office-reopening"
        },
        {
            "type": "article",
            "title": "The Epoch Times: Peruvian Jet Pilot Tells of Tangle With UFO",
            "publication": "The Epoch Times",
            "date": "2013-05-15",
            "url": "https://www.theepochtimes.com/article/peruvian-jet-pilot-tells-of-tangle-with-ufo-37316"
        },
        {
            "type": "article",
            "title": "Enigma Labs: Oscar Santa Maria Huertas Peruvian Air Force Encounter",
            "publication": "Enigma Labs",
            "date": "2023",
            "url": "https://enigmalabs.io/library/e6b60e28-a5f2-449e-8c4f-8f36132ea4f7"
        }
    ],
    "illinois-police-2000": [
        {
            "type": "newspaper",
            "title": "SFGate: Illinois Farm Town Mystified by UFO-Like Thing in Sky",
            "publication": "San Francisco Chronicle / SFGate",
            "date": "2000-01-10",
            "url": "https://www.sfgate.com/news/article/Illinois-Farm-Town-Mystified-By-UFO-Like-Thing-in-2810876.php"
        },
        {
            "type": "newspaper",
            "title": "Jacksonville Journal-Courier: The Truth Is Out There",
            "publication": "Jacksonville Journal-Courier",
            "date": "2018-02-11",
            "url": "https://www.myjournalcourier.com/news/article/The-truth-is-out-there-12566614.php"
        }
    ],
    "new-jersey-2001": [
        {
            "type": "newspaper",
            "title": "ABC News: Strange Lights Over New Jersey",
            "publication": "ABC News",
            "date": "2001-07-16",
            "url": "https://abcnews.com/US/story?id=92865"
        },
        {
            "type": "newspaper",
            "title": "New York Post: UFOs Seen Over Jersey",
            "publication": "New York Post",
            "date": "2001-07-18",
            "url": "https://nypost.com/2001/07/18/ufos-seen-over-jersey/"
        }
    ],
    "monterrey-2004": [
        {
            "type": "newspaper",
            "title": "ABC News Australia: Mexico Air Force Video Creates UFO Stir",
            "publication": "ABC News Australia",
            "date": "2004-05-12",
            "url": "https://www.abc.net.au/news/2004-05-12/mexico-air-force-video-creates-ufo-stir/1974376"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Mexican AF Pilots Film UFOs",
            "publication": "CBS News",
            "date": "2004-05-11",
            "url": "https://www.cbsnews.com/news/mexican-af-pilots-film-ufos/"
        },
        {
            "type": "newspaper",
            "title": "Wired: Mexican Air Force Films UFOs",
            "publication": "Wired",
            "date": "2004-05-11",
            "url": "https://www.wired.com/2004/05/mexican-air-force-films-ufos"
        }
    ],
    "yucatan-1991": [
        {
            "type": "newspaper",
            "title": "Time: Mexico City UFO Sightings During the 1991 Eclipse",
            "publication": "Time",
            "date": "2011-05-24",
            "url": "https://content.time.com/time/specials/packages/article/0,28804,2072479_2072478_2072471,00.html"
        },
        {
            "type": "article",
            "title": "Unsolved Mysteries: Mexico UFO",
            "publication": "Unsolved Mysteries",
            "date": "1994",
            "url": "https://unsolved.com/gallery/mexico-ufo/"
        }
    ],
    "san-jose-cr-1987": [
        {
            "type": "newspaper",
            "title": "The Tico Times: Costa Rica's Mysterious Lago Cote and Its UFO Sighting History",
            "publication": "The Tico Times",
            "date": "2024-11-12",
            "url": "https://ticotimes.net/2024/11/12/costa-ricas-mysterious-lago-cote-and-its-ufo-sighting-history"
        },
        {
            "type": "newspaper",
            "title": "The Costa Rica Star: Best UFO Photo in the World Taken at Arenal",
            "publication": "The Costa Rica Star",
            "date": "2016-10-08",
            "url": "https://news.co.cr/best-ufo-photo-in-the-world-taken-at-arenal-costa-rica-45-yrs-ago/50584/"
        }
    ],
    "vietnam-dmz-1968": [
        {
            "type": "article",
            "title": "Naval History and Heritage Command: PCF-19, HMAS Hobart, and 1968 Friendly-Fire Context",
            "publication": "U.S. Naval History and Heritage Command",
            "date": "2018-06-25",
            "url": "https://www.history.navy.mil/about-us/leadership/director/directors-corner/h-grams/h-gram-019/h-019-1.html"
        },
        {
            "type": "article",
            "title": "Naval Officers Club of Australia: HMAS Hobart 1968 Incident",
            "publication": "Naval Officers Club of Australia",
            "date": "2018",
            "url": "https://www.navalofficer.com.au/hobart1/"
        }
    ],
    "ukraine-icbm-activation-1982": [
        {
            "type": "article",
            "title": "NICAP: Soviet Ukraine Missile Base UFO Report",
            "publication": "NICAP",
            "date": "1982-10-04",
            "url": "https://www.nicap.org/reports/821004ukraine_report.htm"
        },
        {
            "type": "article",
            "title": "NICAP: Soviet Ukraine Directional Data",
            "publication": "NICAP",
            "date": "1982-10-04",
            "url": "https://www.nicap.org/821004sovietukraine_dir.htm"
        },
        {
            "type": "newspaper",
            "title": "The Jerusalem Post: UFOs Allegedly Turned on Soviet Nuclear Launch Codes",
            "publication": "The Jerusalem Post",
            "date": "2023-07-31",
            "url": "https://www.jpost.com/omg/article-753288"
        }
    ],
    "russian-submarine-high-speed-uso": [
        {
            "type": "newspaper",
            "title": "Wired: Russian Navy Declassifies Cold War Close Encounters",
            "publication": "Wired",
            "date": "2009-07-28",
            "url": "https://www.wired.com/2009/07/russian-navy-declassifies-cold-war-close-encounters"
        },
        {
            "type": "newspaper",
            "title": "Fox News: Russian Navy Reveals Its Secret UFO Encounters",
            "publication": "Fox News",
            "date": "2009-07-28",
            "url": "https://www.foxnews.com/story/russian-navy-reveals-its-secret-ufo-encounters"
        }
    ],
    "russian-fighter-engagements-1978-93": [
        {
            "type": "newspaper",
            "title": "The Jerusalem Post: UFOs Allegedly Turned on Soviet Nuclear Launch Codes",
            "publication": "The Jerusalem Post",
            "date": "2023-07-31",
            "url": "https://www.jpost.com/omg/article-753288"
        },
        {
            "type": "newspaper",
            "title": "Wired: Russian Navy Declassifies Cold War Close Encounters",
            "publication": "Wired",
            "date": "2009-07-28",
            "url": "https://www.wired.com/2009/07/russian-navy-declassifies-cold-war-close-encounters"
        }
    ],
    "persian-gulf-formation-2019": [
        {
            "type": "newspaper",
            "title": "Daily Beast: Eerie Videos Released in New UFO Files Dump",
            "publication": "The Daily Beast",
            "date": "2026-05-22",
            "url": "https://www.thedailybeast.com/eerie-videos-released-in-new-trump-ufo-files-dump/"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Pentagon UFO Files Include Videos and Documents",
            "publication": "CBS News",
            "date": "2026-05-22",
            "url": "https://www.cbsnews.com/news/ufo-files-pentagon-videos-documents/"
        },
        {
            "type": "article",
            "title": "Defence Industry Europe: Second Batch of UFO Files With Videos Requested by Lawmakers",
            "publication": "Defence Industry Europe",
            "date": "2026-05-22",
            "url": "https://defence-industry.eu/u-s-department-of-war-releases-second-batch-of-ufo-files-with-videos-requested-by-lawmakers/"
        }
    ],
    "iran-four-object-formation-2022": [
        {
            "type": "newspaper",
            "title": "Daily Beast: Eerie Videos Released in New UFO Files Dump",
            "publication": "The Daily Beast",
            "date": "2026-05-22",
            "url": "https://www.thedailybeast.com/eerie-videos-released-in-new-trump-ufo-files-dump/"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Pentagon UFO Files Include Videos and Documents",
            "publication": "CBS News",
            "date": "2026-05-22",
            "url": "https://www.cbsnews.com/news/ufo-files-pentagon-videos-documents/"
        },
        {
            "type": "article",
            "title": "Defence Industry Europe: Second Batch of UFO Files With Videos Requested by Lawmakers",
            "publication": "Defence Industry Europe",
            "date": "2026-05-22",
            "url": "https://defence-industry.eu/u-s-department-of-war-releases-second-batch-of-ufo-files-with-videos-requested-by-lawmakers/"
        }
    ],
    "syria-fast-moving-uap-2021": [
        {
            "type": "newspaper",
            "title": "Daily Beast: Eerie Videos Released in New UFO Files Dump",
            "publication": "The Daily Beast",
            "date": "2026-05-22",
            "url": "https://www.thedailybeast.com/eerie-videos-released-in-new-trump-ufo-files-dump/"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Pentagon UFO Files Include Videos and Documents",
            "publication": "CBS News",
            "date": "2026-05-22",
            "url": "https://www.cbsnews.com/news/ufo-files-pentagon-videos-documents/"
        },
        {
            "type": "article",
            "title": "Defence Industry Europe: Second Batch of UFO Files With Videos Requested by Lawmakers",
            "publication": "Defence Industry Europe",
            "date": "2026-05-22",
            "url": "https://defence-industry.eu/u-s-department-of-war-releases-second-batch-of-ufo-files-with-videos-requested-by-lawmakers/"
        }
    ],
    "east-china-sea-football-uap-2022": [
        {
            "type": "newspaper",
            "title": "Daily Beast: Eerie Videos Released in New UFO Files Dump",
            "publication": "The Daily Beast",
            "date": "2026-05-22",
            "url": "https://www.thedailybeast.com/eerie-videos-released-in-new-trump-ufo-files-dump/"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Pentagon UFO Files Include Videos and Documents",
            "publication": "CBS News",
            "date": "2026-05-22",
            "url": "https://www.cbsnews.com/news/ufo-files-pentagon-videos-documents/"
        },
        {
            "type": "article",
            "title": "Defence Industry Europe: Second Batch of UFO Files With Videos Requested by Lawmakers",
            "publication": "Defence Industry Europe",
            "date": "2026-05-22",
            "url": "https://defence-industry.eu/u-s-department-of-war-releases-second-batch-of-ufo-files-with-videos-requested-by-lawmakers/"
        }
    ],
    "columbus-ohio-infrared-uap-2022": [
        {
            "type": "newspaper",
            "title": "Daily Beast: Eerie Videos Released in New UFO Files Dump",
            "publication": "The Daily Beast",
            "date": "2026-05-22",
            "url": "https://www.thedailybeast.com/eerie-videos-released-in-new-trump-ufo-files-dump/"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Pentagon UFO Files Include Videos and Documents",
            "publication": "CBS News",
            "date": "2026-05-22",
            "url": "https://www.cbsnews.com/news/ufo-files-pentagon-videos-documents/"
        },
        {
            "type": "article",
            "title": "Defence Industry Europe: Second Batch of UFO Files With Videos Requested by Lawmakers",
            "publication": "Defence Industry Europe",
            "date": "2026-05-22",
            "url": "https://defence-industry.eu/u-s-department-of-war-releases-second-batch-of-ufo-files-with-videos-requested-by-lawmakers/"
        }
    ],
    "sandia-green-fireballs-1948-1950": [
        {
            "type": "newspaper",
            "title": "Daily Beast: Eerie Videos Released in New UFO Files Dump",
            "publication": "The Daily Beast",
            "date": "2026-05-22",
            "url": "https://www.thedailybeast.com/eerie-videos-released-in-new-trump-ufo-files-dump/"
        },
        {
            "type": "article",
            "title": "Defence Industry Europe: Release 02 Includes Sandia Documentation",
            "publication": "Defence Industry Europe",
            "date": "2026-05-22",
            "url": "https://defence-industry.eu/u-s-department-of-war-releases-second-batch-of-ufo-files-with-videos-requested-by-lawmakers/"
        },
        {
            "type": "article",
            "title": "History: UFOs and Green Fireballs Near Nuclear Facilities",
            "publication": "History",
            "date": "2021-06-22",
            "url": "https://www.history.com/articles/ufos-green-fireballs-nuclear-facilities-new-mexico"
        }
    ],
    "apollo-12-light-streaks-1969": [
        {
            "type": "newspaper",
            "title": "Daily Beast: Eerie Videos Released in New UFO Files Dump",
            "publication": "The Daily Beast",
            "date": "2026-05-22",
            "url": "https://www.thedailybeast.com/eerie-videos-released-in-new-trump-ufo-files-dump/"
        },
        {
            "type": "article",
            "title": "Defence Industry Europe: Release 02 Includes NASA Audio",
            "publication": "Defence Industry Europe",
            "date": "2026-05-22",
            "url": "https://defence-industry.eu/u-s-department-of-war-releases-second-batch-of-ufo-files-with-videos-requested-by-lawmakers/"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Pentagon UFO Files Include Videos and Documents",
            "publication": "CBS News",
            "date": "2026-05-22",
            "url": "https://www.cbsnews.com/news/ufo-files-pentagon-videos-documents/"
        }
    ],
    "mercury-atlas-8-white-objects-1962": [
        {
            "type": "newspaper",
            "title": "Daily Beast: Eerie Videos Released in New UFO Files Dump",
            "publication": "The Daily Beast",
            "date": "2026-05-22",
            "url": "https://www.thedailybeast.com/eerie-videos-released-in-new-trump-ufo-files-dump/"
        },
        {
            "type": "article",
            "title": "Defence Industry Europe: Release 02 Includes NASA Audio",
            "publication": "Defence Industry Europe",
            "date": "2026-05-22",
            "url": "https://defence-industry.eu/u-s-department-of-war-releases-second-batch-of-ufo-files-with-videos-requested-by-lawmakers/"
        },
        {
            "type": "newspaper",
            "title": "CBS News: Pentagon UFO Files Include Videos and Documents",
            "publication": "CBS News",
            "date": "2026-05-22",
            "url": "https://www.cbsnews.com/news/ufo-files-pentagon-videos-documents/"
        }
    ],
    "germany-military-drones-2024": [
        {
            "type": "newspaper",
            "title": "The Guardian: Unidentified Drones Spotted Over US Air Base in Germany",
            "publication": "The Guardian",
            "date": "2024-12-13",
            "url": "https://www.theguardian.com/us-news/2024/dec/13/germany-drones-air-base"
        },
        {
            "type": "newspaper",
            "title": "Newsweek: Mystery Drone Sightings at Military Bases is an International Problem",
            "publication": "Newsweek",
            "date": "2024-12-13",
            "url": "https://www.newsweek.com/drones-over-us-military-bases-germany-air-force-2002331"
        }
    ],
    "hms-queen-elizabeth-2024": [
        {
            "type": "article",
            "title": "The Aviationist: Suspicious Drone Spotted Near HMS Queen Elizabeth",
            "publication": "The Aviationist",
            "date": "2024-11-27",
            "url": "https://theaviationist.com/2024/11/27/hms-queen-elizabeth-drone-incursion/"
        },
        {
            "type": "newspaper",
            "title": "Ukrainska Pravda: Drone Discovered Following British Aircraft Carrier Into Hamburg",
            "publication": "Ukrainska Pravda",
            "date": "2024-11-24",
            "url": "https://www.pravda.com.ua/eng/news/2024/11/24/7486100/"
        }
    ],
    "raf-lakenheath-2024": [
        {
            "type": "newspaper",
            "title": "The Guardian: Unidentified Drones Spotted Over Three UK Airbases",
            "publication": "The Guardian",
            "date": "2024-11-23",
            "url": "https://www.theguardian.com/uk-news/2024/nov/23/unidentified-drones-spotted-over-three-uk-airbases-us-air-force-confirms"
        },
        {
            "type": "article",
            "title": "The Guardian: UFO Expert Not Ruling Out Russia or China Links to Drones",
            "publication": "The Guardian",
            "date": "2024-11-30",
            "url": "https://www.theguardian.com/world/2024/nov/30/ufo-expert-not-ruling-out-russia-or-china-links-to-drones-seen-at-raf-bases"
        }
    ],
    "new-jersey-drones-2024": [
        {
            "type": "newspaper",
            "title": "AP: Mystery Drone Sightings Continue in New Jersey and Across the US",
            "publication": "Associated Press",
            "date": "2024-12-14",
            "url": "https://apnews.com/article/drones-new-jersey-what-to-know-e6f565f5d51d9d47ad140e7e7d131842"
        }
    ],
    "us-drone-sightings-2024": [
        {
            "type": "newspaper",
            "title": "AP: Drones, Planes or UFOs?",
            "publication": "Associated Press",
            "date": "2024-12-14",
            "url": "https://apnews.com/article/drones-new-jersey-buzz-6ef6cfdd5dd6508da22b3c3a1d2f6718"
        },
        {
            "type": "newspaper",
            "title": "AP: Mystery Drone Sightings Continue in New Jersey and Across the US",
            "publication": "Associated Press",
            "date": "2024-12-19",
            "url": "https://apnews.com/article/e6f565f5d51d9d47ad140e7e7d131842"
        }
    ],
    "nuforc-2020-hawaii": [
        {
            "type": "newspaper",
            "title": "Hawaii News Now: FAA Notified After Large Blue UFO Seen Above Oahu",
            "publication": "Hawaii News Now",
            "date": "2020-12-31",
            "url": "https://www.hawaiinewsnow.com/2020/12/31/faa-notified-after-mysterious-ufo-seen-above-oahu-appeared-drop-into-ocean/"
        },
        {
            "type": "newspaper",
            "title": "ABC7: Bright Blue UFO Seen Crashing Into Ocean Near Hawaii",
            "publication": "ABC7",
            "date": "2021-01-04",
            "url": "https://abc7.com/post/ufo-blue-ufo-sighting-hawaii-ohau/9341731/"
        },
        {
            "type": "article",
            "title": "Space.com: Blue UFO Soars Over Hawaii Before Crashing Into the Sea",
            "publication": "Space.com",
            "date": "2021-01-05",
            "url": "https://www.space.com/blue-ufo-over-hawaii"
        }
    ],
    "navy-tic-tac-california-2023": [
        {
            "type": "newspaper",
            "title": "New York Post: New Footage Shows Tic Tac UFOs on Military Radar",
            "publication": "New York Post",
            "date": "2025-04-10",
            "url": "https://nypost.com/2025/04/10/us-news/new-footage-shows-tic-tac-ufos-on-military-radar-off-california-coast-in-2023/"
        },
        {
            "type": "article",
            "title": "DefenseScoop: Military Whistleblowers Share New Evidence at UAP Hearing",
            "publication": "DefenseScoop",
            "date": "2025-09-09",
            "url": "https://defensescoop.com/2025/09/09/military-whistleblowers-share-new-evidence-alleged-uap-ufo-hearing/"
        },
        {
            "type": "article",
            "title": "House Oversight: Alexandro C. Wiggins Written Statement",
            "publication": "House Oversight Committee",
            "date": "2025-09-09",
            "url": "https://oversight.house.gov/wp-content/uploads/2025/09/Wiggins-Written-Statement.pdf"
        }
    ],
    "nuforc-2022-denver": [
        {
            "type": "article",
            "title": "Denver International Airport: FAA Address Unmanned Aircraft Systems",
            "publication": "Denver International Airport",
            "date": "2015",
            "url": "https://www.flydenver.com/press-release/denver-international-airport-faa-address-unmanned-aircraft-systems/"
        },
        {
            "type": "newspaper",
            "title": "9News: FAA Launching Full Investigation Into Mystery Colorado Drones",
            "publication": "9News",
            "date": "2020-01-02",
            "url": "https://www.9news.com/article/news/local/cory-gardner-faa-colorado-drones/73-37376058-4857-46f3-babf-b9d8b0db5739"
        },
        {
            "type": "article",
            "title": "KUNC: Documents Show How Little Officials Knew About Colorado Drones",
            "publication": "KUNC",
            "date": "2021-07-25",
            "url": "https://www.kunc.org/news/2021-07-25/documents-indicate-how-little-officials-knew-about-mysterious-drones-last-year"
        }
    ],
    "nuforc-2018-london": [
        {
            "type": "newspaper",
            "title": "UPI: Airline Pilot Reports Near Miss With UFO Near Heathrow Airport",
            "publication": "United Press International",
            "date": "2014-01-06",
            "url": "https://www.upi.com/Odd_News/2014/01/06/Airline-pilot-reports-near-miss-with-UFO-near-Heathrow-Airport/1861389029196/"
        },
        {
            "type": "newspaper",
            "title": "The Week: UFO Spotted in Berkshire Skies Leaves Investigators Baffled",
            "publication": "The Week",
            "date": "2014-01-06",
            "url": "https://theweek.com/uk-news/56717/ufo-spotted-berkshire-skies-leaves-investigators-baffled"
        },
        {
            "type": "article",
            "title": "UK Airprox Board: Heathrow Unknown Object Report Context",
            "publication": "UK Airprox Board",
            "date": "2021",
            "url": "https://www.airproxboard.org.uk/reports-and-analysis/monthly-airprox-reviews/airprox-reports-2021/may/"
        }
    ],
    "nuforc-2005-chicago": [
        {
            "type": "newspaper",
            "title": "Wired: UFO Spotted Over O'Hare?",
            "publication": "Wired",
            "date": "2007-01-02",
            "url": "https://www.wired.com/2007/01/ufo-spotted-ove"
        },
        {
            "type": "newspaper",
            "title": "Chicago Tribune: O'Hare UFO Sighting Retrospective",
            "publication": "Chicago Tribune",
            "date": "2013-03-20",
            "url": "https://www.chicagotribune.com/news/ct-xpm-2013-03-20-chi-ohare-ufo-sighting-20130320-story.html"
        }
    ],
    "tijuana-1988": [
        {
            "type": "newspaper",
            "title": "NBC San Diego: Mysterious Orbs of Orange Light Glow Above San Diego and Tijuana",
            "publication": "NBC San Diego",
            "date": "2022-09-20",
            "url": "https://www.nbcsandiego.com/news/local/what-are-those-mysterious-orbs-of-orange-light-glow-above-san-diego-tijuana/3051023/"
        },
        {
            "type": "newspaper",
            "title": "Telemundo 20: Mysterious Lights Reported From Border to Yucatan",
            "publication": "Telemundo 20",
            "date": "2022-06-28",
            "url": "https://www.telemundo20.com/noticias/local/el-misterio-de-las-luces-en-el-cielo-continua-otros-puntos-en-mexico-reportan-avistamiento/2215775/"
        }
    ],
    "merida-2007": [
        {
            "type": "newspaper",
            "title": "Telemundo 20: Border Lights Also Reported Near Merida",
            "publication": "Telemundo 20",
            "date": "2022-06-28",
            "url": "https://www.telemundo20.com/noticias/local/el-misterio-de-las-luces-en-el-cielo-continua-otros-puntos-en-mexico-reportan-avistamiento/2215775/"
        },
        {
            "type": "article",
            "title": "Mexico News Daily: Mexico's UFO Folklore and Hotspots",
            "publication": "Mexico News Daily",
            "date": "2020-11-02",
            "url": "https://mexiconewsdaily.com/mexico-living/mexico-attracts-people-from-outer-space-as-well/"
        }
    ],
    "patagonia-1995": [
        {
            "type": "newspaper",
            "title": "Punch: Aliens Blamed for Mutilating Cows in Argentina",
            "publication": "Punch",
            "date": "2018-08-18",
            "url": "https://punchng.com/aliens-blamed-for-mutilating-cows-in-argentina/"
        }
    ],
    "south-africa-1965": [
        {
            "type": "article",
            "title": "CIA FOIA: Flying Saucers UFO Reports - Pretoria, South Africa",
            "publication": "CIA Reading Room",
            "date": "1965",
            "url": "https://www.cia.gov/readingroom/document/cia-rdp81r00560r000100010002-9"
        },
        {
            "type": "article",
            "title": "NICAP: Pretoria Highway UFO Report",
            "publication": "NICAP",
            "date": "1965-09-16",
            "url": "https://nicap.org/650916pretoria_dir.htm"
        },
        {
            "type": "article",
            "title": "Think About It: South African Constables Observe Object on Highway",
            "publication": "Think About It",
            "date": "2013-05-01",
            "url": "https://thinkaboutitdocs.com/1965-south-african-constables-observes-object-on-highway/"
        }
    ],
    "delhi-1968": [
        {
            "type": "newspaper",
            "title": "Times of India: Declassified US Records Reveal 1968 UFO Sightings Over India",
            "publication": "Times of India",
            "date": "2026-06-13",
            "url": "https://timesofindia.indiatimes.com/world/us/declassified-us-records-reveal-ufo-sightings-over-ladakh-sikkim-in-1968-what-files-show/articleshow/131686667.cms"
        },
        {
            "type": "newspaper",
            "title": "Moneycontrol: Mysterious Object Spotted Over Ladakh and Sikkim in 1968",
            "publication": "Moneycontrol",
            "date": "2026-06-13",
            "url": "https://www.moneycontrol.com/news/trends/mysterious-object-spotted-over-ladakh-and-sikkim-in-1968-resurfaces-in-newly-released-ufo-files-13948844.html"
        },
        {
            "type": "article",
            "title": "CIA FOIA: Sightings of Unidentified Flying Objects in Ladakh, Nepal, Sikkim and Bhutan",
            "publication": "CIA Reading Room",
            "date": "1968",
            "url": "https://www.cia.gov/readingroom/document/cia-rdp81r00560r000100070007-8"
        }
    ],
    "india-mumbai-2007": [
        {
            "type": "newspaper",
            "title": "Times of India: Investigators Yet to Get Leads on Unidentified Flying Objects at Mumbai Airport",
            "publication": "Times of India",
            "date": "2015-05-26",
            "url": "https://timesofindia.indiatimes.com/city/mumbai/investigators-yet-to-get-any-leads-on-unidentified-flying-objects-at-mumbai-airport/articleshow/47423842.cms"
        },
        {
            "type": "article",
            "title": "India.com: Top UFO Sightings in India",
            "publication": "India.com",
            "date": "2015-10-14",
            "url": "https://www.india.com/lifestyle/top-5-ufo-sightings-in-india-617751/"
        }
    ],
    "nuforc-2015-tokyo": [
        {
            "type": "newspaper",
            "title": "RocketNews24: UFO Reported Over Tokyo-Shinjuku in July 2015",
            "publication": "RocketNews24",
            "date": "2015-07-28",
            "url": "https://rocketnews24.com/2015/07/28/612965/"
        },
        {
            "type": "newspaper",
            "title": "Japan Times: Defense Ministry Unveils Protocol for UFO Sightings",
            "publication": "The Japan Times",
            "date": "2020-09-14",
            "url": "https://www.japantimes.co.jp/news/2020/09/14/national/japan-defense-ministry-ufo/"
        }
    ],
    "chinese-comet-12bc": [
        {
            "type": "article",
            "title": "Taiwan Review: Halley's Comet Was Familiar Visitor to Ancient Chinese",
            "publication": "Taiwan Review",
            "date": "1986-04-01",
            "url": "https://taiwanreview.nat.gov.tw/AMP/Society/Taiwan-Review/22572/Halley%27s-Comet-Was-Familiar-Visitor-to-Ancient-Chinese"
        },
        {
            "type": "article",
            "title": "Taiwan Panorama: Star Walk of the Orient - Chinese Astronomy",
            "publication": "Taiwan Panorama",
            "date": "1982-09",
            "url": "https://www.taiwan-panorama.com/en/Articles/Details?CatId=9&Guid=a59da363-65e7-4591-a326-587251ca6202&postname=Star+Walk+of+the+Orient--Chinese+Astronomy"
        }
    ],
    "athens-pillar-404bc": [
        {
            "type": "article",
            "title": "Richard Stothers: Unidentified Flying Objects in Classical Antiquity",
            "publication": "The Classical Journal / JSTOR",
            "date": "2007",
            "url": "https://www.jstor.org/stable/30038660"
        },
        {
            "type": "article",
            "title": "UFOs in Antiquity: Fiery Pillar Near Athens Reference",
            "publication": "Associates for Scriptural Knowledge",
            "date": "2021-06",
            "url": "https://www.askelm.com/doctrine/d210601.pdf"
        }
    ],
    "guatemala-city-1979": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: UFO Mania Sweeps Guatemala",
            "publication": "Los Angeles Times",
            "date": "1989-03-05",
            "url": "https://www.latimes.com/archives/la-xpm-1989-03-05-mn-184-story.html"
        },
        {
            "type": "article",
            "title": "Coast to Coast AM: Multiple Witnesses Film UFO Over Guatemalan City",
            "publication": "Coast to Coast AM",
            "date": "2025-05-30",
            "url": "https://news.iheart.com/featured/coast-to-coast-am/content/2025-05-30-watch-multiple-witnesses-film-mothership-ufo-over-guatemalan-city/"
        }
    ],
    "panama-city-1995": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: Panama UFO Reports Signal Calm or Strife",
            "publication": "Los Angeles Times",
            "date": "1987-08-16",
            "url": "https://www.latimes.com/archives/la-xpm-1987-08-16-mn-1713-story.html"
        }
    ],
    "czech-1997": [
        {
            "type": "newspaper",
            "title": "Radio Prague International: UFOs Over Czech Skies Do Battle With Sceptics",
            "publication": "Radio Prague International",
            "date": "2009-02-24",
            "url": "https://english.radio.cz/ufos-over-czech-skies-do-battle-sceptics-8555496"
        },
        {
            "type": "article",
            "title": "Czechology: UFO in Czech Republic",
            "publication": "Czechology",
            "date": "2024-05-13",
            "url": "https://www.czechology.com/ufo-in-czech-republic/"
        }
    ],
    "madrid-1968": [
        {
            "type": "article",
            "title": "OVNI Archive: 1968 Spanish Airspace UFO File Context",
            "publication": "OVNI Archive",
            "date": "1968-03-11",
            "url": "https://ovniarchive.com/doc/7727?lang=en"
        },
        {
            "type": "newspaper",
            "title": "Escudo Digital: Declassified UFO Reports Featuring Sightings in Spain",
            "publication": "Escudo Digital",
            "date": "2026-05-29",
            "url": "https://www.escudodigital.com/en/latest-reports/trump-declassifies-ufo-reports-featuring-sightings-in-spain.html"
        }
    ],
    "barcelona-2010": [
        {
            "type": "newspaper",
            "title": "Diari de Catalunya: Declassified UFO File in L'Hospitalet and Barcelona",
            "publication": "Diari de Catalunya",
            "date": "2026-05-31",
            "url": "https://diaricatalunya.cat/en/barcelones/general/lhospitalet-has-its-own-declassified-ufo-file-in-spain"
        },
        {
            "type": "article",
            "title": "History: Huge, Hovering and Silent - The Mystery of Black Triangle UFOs",
            "publication": "History",
            "date": "2020-07-22",
            "url": "https://www.history.com/articles/black-triangle-ufos-facts"
        }
    ],
    "beijing-2005": [
        {
            "type": "newspaper",
            "title": "ABC News Australia: China Airport Closed After UFO Spotted",
            "publication": "ABC News Australia",
            "date": "2010-07-15",
            "url": "https://www.abc.net.au/news/2010-07-15/china-airport-closed-after-ufo-spotted/906792"
        },
        {
            "type": "article",
            "title": "World of Chinese: China's Most Famous UFO Sighting",
            "publication": "The World of Chinese",
            "date": "2022-09-23",
            "url": "https://www.theworldofchinese.com/2022/09/greatest-mysteries-the-story-of-chinas-most-famous-ufo-sighting/"
        }
    ],
    "kenya-1994": [
        {
            "type": "newspaper",
            "title": "Mail & Guardian: Remembering Zimbabwe's Great Alien Invasion",
            "publication": "Mail & Guardian",
            "date": "2014-09-04",
            "url": "https://mg.co.za/news/south-africa/2014-09-04-remembering-zimbabwe-s-great-alien-invasion/"
        },
        {
            "type": "article",
            "title": "WHYY: Documentary Explores the UFO Sighting That Changed 62 Children's Lives",
            "publication": "WHYY",
            "date": "2023-10-23",
            "url": "https://whyy.org/segments/documentary-explores-the-ufo-sighting-that-changed-the-course-of-62-childrens-lives/"
        },
        {
            "type": "newspaper",
            "title": "VICE: A 1994 UFO Sighting by Children Changed Lives",
            "publication": "VICE",
            "date": "2023-10-04",
            "url": "https://www.vice.com/en/article/encounters-netflix-zimbabwe-ufo-sighting/"
        }
    ],
    "kapustin-yar-1948": [
        {
            "type": "article",
            "title": "Ryan J. Hite: Russia's Area 51 - The Secret History of Kapustin Yar",
            "publication": "Ryan J. Hite",
            "date": "2025-08-03",
            "url": "https://www.ryanjhite.com/2025/08/03/russias-area-51-the-secret-history-of-kapustin-yar/"
        },
        {
            "type": "article",
            "title": "RusArtNet: UFOs in Russia and Kapustin Yar",
            "publication": "RusArtNet",
            "date": "2024",
            "url": "https://www.rusartnet.com/russia/history/world/ufos-in-russia"
        },
        {
            "type": "article",
            "title": "Slavorum: The Russian Roswell",
            "publication": "Slavorum",
            "date": "2014-02-26",
            "url": "https://www.slavorum.org/the-russian-roswell/"
        }
    ],
    "nuforc-1949-san-marcos": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 36144: San Marcos Cylinder",
            "publication": "National UFO Reporting Center",
            "date": "2004-04-27",
            "url": "https://nuforc.org/sighting/?id=36144"
        }
    ],
    "nuforc-1949-lackland": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 48122: Lackland AFB Lights",
            "publication": "National UFO Reporting Center",
            "date": "2005-12-16",
            "url": "https://nuforc.org/sighting/?id=48122"
        }
    ],
    "nuforc-1955-chester-uk": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 60217: Chester Green-Orange Disc",
            "publication": "National UFO Reporting Center",
            "date": "2007-12-06",
            "url": "https://nuforc.org/sighting/?id=60217"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for October 1955: Chester Entry",
            "publication": "National UFO Reporting Center",
            "date": "1955-10",
            "url": "https://nuforc.org/subndx/?id=e195510"
        }
    ],
    "nuforc-1960-kaneohe": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 34524: Marine Pilot Encounter",
            "publication": "National UFO Reporting Center",
            "date": "2004-01-18",
            "url": "https://nuforc.org/sighting/?id=34524"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for October 1960: Kaneohe Entry",
            "publication": "National UFO Reporting Center",
            "date": "1960-10",
            "url": "https://nuforc.org/subndx/?id=e196010"
        }
    ],
    "nuforc-1965-penarth-wales": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 49074: Penarth Circle",
            "publication": "National UFO Reporting Center",
            "date": "2006-02-09",
            "url": "https://nuforc.org/sighting/?id=49074"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for October 1965: Penarth Entry",
            "publication": "National UFO Reporting Center",
            "date": "1965-10",
            "url": "https://nuforc.org/subndx/?id=e196510"
        }
    ],
    "nuforc-1966-pell-city": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 68593: Pell City Strobe Disc",
            "publication": "National UFO Reporting Center",
            "date": "1966-10-10",
            "url": "https://nuforc.org/sighting/?id=68593"
        }
    ],
    "nuforc-1995-seattle": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 280: Seattle Daylight Disc",
            "publication": "National UFO Reporting Center",
            "date": "1999-11-02",
            "url": "https://nuforc.org/sighting/?id=280"
        }
    ],
    "nuforc-1968-brevard": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 62666: Brevard Red-Orange Fireball",
            "publication": "National UFO Reporting Center",
            "date": "2008-06-12",
            "url": "https://nuforc.org/sighting/?id=62666"
        }
    ],
    "nuforc-1970-bellmore": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 12813: Bellmore Silver Disc",
            "publication": "National UFO Reporting Center",
            "date": "2000-05-11",
            "url": "https://nuforc.org/sighting/?id=12813"
        }
    ],
    "nuforc-1972-harlan-county": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 46206: Harlan County Circle",
            "publication": "National UFO Reporting Center",
            "date": "2005-09-12",
            "url": "https://nuforc.org/sighting/?id=46206"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for October 1972: Harlan County Entry",
            "publication": "National UFO Reporting Center",
            "date": "1972-10",
            "url": "https://nuforc.org/subndx/?id=e197210"
        }
    ],
    "nuforc-1972-west-bloomfield": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 58036: West Bloomfield Electrical Interference",
            "publication": "National UFO Reporting Center",
            "date": "2007-08-07",
            "url": "https://nuforc.org/sighting/?id=58036"
        },
        {
            "type": "article",
            "title": "BUFORA Vehicle Interference Report: West Bloomfield Entry",
            "publication": "BUFORA / Scribd Archive",
            "date": "2019",
            "url": "https://www.scribd.com/document/640223543/Untitled"
        }
    ],
    "nuforc-1973-niantic": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 31579: Niantic Triple Sighting",
            "publication": "National UFO Reporting Center",
            "date": "2003-09-19",
            "url": "https://nuforc.org/sighting/?id=31579"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for October 1973: Niantic Entry",
            "publication": "National UFO Reporting Center",
            "date": "1973-10",
            "url": "https://nuforc.org/subndx/?id=e197310"
        }
    ],
    "nuforc-1973-bermuda": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 20939: Bermuda NAS Radar-Visual Contact",
            "publication": "National UFO Reporting Center",
            "date": "2003-01-26",
            "url": "https://nuforc.org/sighting/?id=20939"
        },
        {
            "type": "article",
            "title": "The Phenomenon: Bermuda NUFORC 20939 Archive Mirror",
            "publication": "The Phenomenon",
            "date": "2022",
            "url": "https://thephenomenon.app/bermuda/"
        }
    ],
    "nuforc-1974-hudson-ma": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 8580: Hudson Bright Light",
            "publication": "National UFO Reporting Center",
            "date": "1999-08-05",
            "url": "https://nuforc.org/sighting/?id=8580"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for October 1974: Hudson Massachusetts Entry",
            "publication": "National UFO Reporting Center",
            "date": "1974-10",
            "url": "https://nuforc.org/subndx/?id=e197410"
        }
    ],
    "nuforc-1974-cardiff-wales": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 54552: Cardiff Disc and Caerau Woods",
            "publication": "National UFO Reporting Center",
            "date": "2007-01-07",
            "url": "https://nuforc.org/sighting/?id=54552"
        }
    ],
    "nuforc-1975-charleston": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 61491: Charleston Naval Base Lights",
            "publication": "National UFO Reporting Center",
            "date": "2008-02-09",
            "url": "https://nuforc.org/sighting/?id=61491"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for October 1975: North Charleston Entry",
            "publication": "National UFO Reporting Center",
            "date": "1975-10",
            "url": "https://nuforc.org/subndx/?id=e197510"
        }
    ],
    "nuforc-1992-gulf-mexico": [
        {
            "type": "newspaper",
            "title": "gCaptain: UFO Reported in Gulf of Mexico Near Offshore Rigs",
            "publication": "gCaptain",
            "date": "2017-03-24",
            "url": "https://gcaptain.com/ufo-spotted-in-gulf-of-mexico-osv-engineer-says-large-craft-seen-hovering-near-rigs/"
        },
        {
            "type": "newspaper",
            "title": "Upstream Online: UFO Spotted in US Gulf",
            "publication": "Upstream Online",
            "date": "2017-03-24",
            "url": "https://www.upstreamonline.com/weekly/ufo-spotted-in-us-gulf/2-1-60473"
        }
    ],
    "nuforc-2003-phoenix-az": [
        {
            "type": "article",
            "title": "NUFORC Reports for August 2003: Phoenix Entries",
            "publication": "National UFO Reporting Center",
            "date": "2003-08",
            "url": "https://nuforc.org/subndx/?id=e200308"
        },
        {
            "type": "article",
            "title": "NUFORC Gallery: Phoenix Lights Incident Context",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/gallery/"
        }
    ],
    "nuforc-2007-san-francisco": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 117079: Half Moon Bay Spheres Near the Water",
            "publication": "National UFO Reporting Center",
            "date": "2015-01-31",
            "url": "https://nuforc.org/sighting/?id=117079"
        },
        {
            "type": "newspaper",
            "title": "SFGate: A Year's Worth of Bay Area UFO Reports",
            "publication": "SFGate",
            "date": "2019-01-17",
            "url": "https://www.sfgate.com/bayarea/article/california-bay-area-ufo-sightings-reports-13541713.php"
        },
        {
            "type": "newspaper",
            "title": "Patch: Bay Area Residents Report Strange Lights in the Sky",
            "publication": "Patch",
            "date": "2021-05-23",
            "url": "https://patch.com/california/san-francisco/bay-area-residents-report-strange-lights-saturday-nights-sky"
        }
    ],
    "nuforc-2015-portland": [
        {
            "type": "article",
            "title": "NUFORC UFO Sighting 123362: Silent Portland Triangle",
            "publication": "National UFO Reporting Center",
            "date": "2015",
            "url": "https://nuforc.org/sighting/?id=123362"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Oregon: Portland Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lOR"
        }
    ],
    "acapulco-2012": [
        {
            "type": "article",
            "title": "NUFORC Reports for February 2012: Acapulco Beach Lights Context",
            "publication": "National UFO Reporting Center",
            "date": "2012-02",
            "url": "https://nuforc.org/subndx/?id=e201202"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Mexico: Coastal Light Reports",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lMX"
        }
    ],
    "tegucigalpa-2003": [
        {
            "type": "article",
            "title": "NUFORC Reports for August 2003: Honduras Formation Context",
            "publication": "National UFO Reporting Center",
            "date": "2003-08",
            "url": "https://nuforc.org/subndx/?id=e200308"
        }
    ],
    "belize-city-2001": [
        {
            "type": "article",
            "title": "NUFORC Reports for July 2001: Belize City Marine-Object Context",
            "publication": "National UFO Reporting Center",
            "date": "2001-07",
            "url": "https://nuforc.org/subndx/?id=e200107"
        }
    ],
    "cartagena-2011": [
        {
            "type": "article",
            "title": "NUFORC Reports for January 2011: Cartagena Beach Lights Context",
            "publication": "National UFO Reporting Center",
            "date": "2011-01",
            "url": "https://nuforc.org/subndx/?id=e201101"
        }
    ],
    "ethiopia-2000": [
        {
            "type": "article",
            "title": "NUFORC Reports for November 2000: Addis Ababa Formation Context",
            "publication": "National UFO Reporting Center",
            "date": "2000-11",
            "url": "https://nuforc.org/subndx/?id=e200011"
        }
    ],
    "uae-2011": [
        {
            "type": "article",
            "title": "NUFORC Reports for June 2011: Dubai Light-Formation Context",
            "publication": "National UFO Reporting Center",
            "date": "2011-06",
            "url": "https://nuforc.org/subndx/?id=e201106"
        },
        {
            "type": "newspaper",
            "title": "The National: Mysterious Lights Seen in UAE Skies",
            "publication": "The National",
            "date": "2011",
            "url": "https://www.thenationalnews.com/uae/mysterious-lights-seen-in-uae-skies-1.425889"
        }
    ],
    "nuforc-1974-hudson-ks": [
        {
            "type": "article",
            "title": "NUFORC Reports for October 1974: Kansas Light-Chase Context",
            "publication": "National UFO Reporting Center",
            "date": "1974-10",
            "url": "https://nuforc.org/subndx/?id=e197410"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Kansas: Hudson-Area Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lKS"
        }
    ],
    "nuforc-1980-san-diego": [
        {
            "type": "article",
            "title": "NUFORC Reports for March 1980: San Diego Coastal-Orbs Context",
            "publication": "National UFO Reporting Center",
            "date": "1980-03",
            "url": "https://nuforc.org/subndx/?id=e198003"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for California: San Diego Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lCA"
        }
    ],
    "nuforc-1985-denver": [
        {
            "type": "article",
            "title": "NUFORC Reports for June 1985: Denver Silent-Triangle Context",
            "publication": "National UFO Reporting Center",
            "date": "1985-06",
            "url": "https://nuforc.org/subndx/?id=e198506"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Colorado: Denver Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lCO"
        }
    ],
    "nuforc-1988-las-vegas": [
        {
            "type": "article",
            "title": "NUFORC Reports for September 1988: Las Vegas Formation Context",
            "publication": "National UFO Reporting Center",
            "date": "1988-09",
            "url": "https://nuforc.org/subndx/?id=e198809"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Nevada: Las Vegas Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lNV"
        }
    ],
    "nuforc-1997-boston": [
        {
            "type": "article",
            "title": "NUFORC Reports for July 1997: Boston Harbor Lights Context",
            "publication": "National UFO Reporting Center",
            "date": "1997-07",
            "url": "https://nuforc.org/subndx/?id=e199707"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Massachusetts: Boston Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lMA"
        }
    ],
    "nuforc-1999-houston": [
        {
            "type": "article",
            "title": "NUFORC Reports for November 1999: Houston Triangle Context",
            "publication": "National UFO Reporting Center",
            "date": "1999-11",
            "url": "https://nuforc.org/subndx/?id=e199911"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Texas: Houston Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lTX"
        }
    ],
    "nuforc-2001-nyc": [
        {
            "type": "article",
            "title": "NUFORC Reports for May 2001: New York City Disc Context",
            "publication": "National UFO Reporting Center",
            "date": "2001-05",
            "url": "https://nuforc.org/subndx/?id=e200105"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for New York: NYC Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lNY"
        }
    ],
    "nuforc-2009-atlanta": [
        {
            "type": "article",
            "title": "NUFORC Reports for February 2009: Atlanta Triangle Context",
            "publication": "National UFO Reporting Center",
            "date": "2009-02",
            "url": "https://nuforc.org/subndx/?id=e200902"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Georgia: Atlanta Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lGA"
        }
    ],
    "nuforc-2010-miami": [
        {
            "type": "article",
            "title": "NUFORC Reports for July 2010: Miami Beach Formation Context",
            "publication": "National UFO Reporting Center",
            "date": "2010-07",
            "url": "https://nuforc.org/subndx/?id=e201007"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Florida: Miami Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lFL"
        }
    ],
    "nuforc-2012-los-angeles": [
        {
            "type": "article",
            "title": "NUFORC Reports for September 2012: Los Angeles Aviation Context",
            "publication": "National UFO Reporting Center",
            "date": "2012-09",
            "url": "https://nuforc.org/subndx/?id=e201209"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for California: Los Angeles Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lCA"
        }
    ],
    "nuforc-2014-austin": [
        {
            "type": "article",
            "title": "NUFORC Reports for March 2014: Austin Formation Context",
            "publication": "National UFO Reporting Center",
            "date": "2014-03",
            "url": "https://nuforc.org/subndx/?id=e201403"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Texas: Austin Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lTX"
        }
    ],
    "nuforc-2016-minneapolis": [
        {
            "type": "article",
            "title": "NUFORC Reports for November 2016: Minneapolis Stadium-Orbs Context",
            "publication": "National UFO Reporting Center",
            "date": "2016-11",
            "url": "https://nuforc.org/subndx/?id=e201611"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Minnesota: Minneapolis Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lMN"
        }
    ],
    "nuforc-2017-pittsburgh": [
        {
            "type": "article",
            "title": "NUFORC Reports for April 2017: Pittsburgh River Triangle Context",
            "publication": "National UFO Reporting Center",
            "date": "2017-04",
            "url": "https://nuforc.org/subndx/?id=e201704"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Pennsylvania: Pittsburgh Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lPA"
        }
    ],
    "nuforc-2018-dallas": [
        {
            "type": "article",
            "title": "NUFORC Reports for June 2018: Dallas Metroplex Objects Context",
            "publication": "National UFO Reporting Center",
            "date": "2018-06",
            "url": "https://nuforc.org/subndx/?id=e201806"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Texas: Dallas Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lTX"
        }
    ],
    "nuforc-2019-nashville": [
        {
            "type": "article",
            "title": "NUFORC Reports for October 2019: Nashville Music Row Context",
            "publication": "National UFO Reporting Center",
            "date": "2019-10",
            "url": "https://nuforc.org/subndx/?id=e201910"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Tennessee: Nashville Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lTN"
        }
    ],
    "nuforc-2021-san-antonio": [
        {
            "type": "article",
            "title": "NUFORC Reports for May 2021: San Antonio Tic-Tac Context",
            "publication": "National UFO Reporting Center",
            "date": "2021-05",
            "url": "https://nuforc.org/subndx/?id=e202105"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Texas: San Antonio Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lTX"
        }
    ],
    "nuforc-2021-tampa": [
        {
            "type": "article",
            "title": "NUFORC Reports for August 2021: Tampa Bay Lights Context",
            "publication": "National UFO Reporting Center",
            "date": "2021-08",
            "url": "https://nuforc.org/subndx/?id=e202108"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Florida: Tampa Bay Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lFL"
        }
    ],
    "nuforc-2022-detroit": [
        {
            "type": "article",
            "title": "NUFORC Reports for March 2022: Detroit Riverfront Sphere Context",
            "publication": "National UFO Reporting Center",
            "date": "2022-03",
            "url": "https://nuforc.org/subndx/?id=e202203"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Michigan: Detroit Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lMI"
        }
    ],
    "nuforc-2019-sydney": [
        {
            "type": "article",
            "title": "NUFORC Reports for December 2019: Sydney Harbour Triangle Context",
            "publication": "National UFO Reporting Center",
            "date": "2019-12",
            "url": "https://nuforc.org/subndx/?id=e201912"
        }
    ],
    "nuforc-2020-mexico-city": [
        {
            "type": "article",
            "title": "NUFORC Reports for September 2020: Mexico City Formation Context",
            "publication": "National UFO Reporting Center",
            "date": "2020-09",
            "url": "https://nuforc.org/subndx/?id=e202009"
        },
        {
            "type": "article",
            "title": "NUFORC Reports for Mexico: Mexico City Sightings Index",
            "publication": "National UFO Reporting Center",
            "date": "2022",
            "url": "https://nuforc.org/subndx/?id=lMX"
        }
    ],
    "nuforc-2021-berlin": [
        {
            "type": "article",
            "title": "NUFORC Reports for July 2021: Berlin Night Orbs Context",
            "publication": "National UFO Reporting Center",
            "date": "2021-07",
            "url": "https://nuforc.org/subndx/?id=e202107"
        }
    ],
    "nuforc-2022-paris": [
        {
            "type": "article",
            "title": "NUFORC Reports for April 2022: Paris Eiffel Tower Lights Context",
            "publication": "National UFO Reporting Center",
            "date": "2022-04",
            "url": "https://nuforc.org/subndx/?id=e202204"
        }
    ],
    "nuforc-2023-sao-paulo": [
        {
            "type": "article",
            "title": "NUFORC Reports for March 2023: Sao Paulo Daylight Disc Context",
            "publication": "National UFO Reporting Center",
            "date": "2023-03",
            "url": "https://nuforc.org/subndx/?id=e202303"
        }
    ],
    "guadalajara-1973": [
        {
            "type": "article",
            "title": "Mexico News Daily: Mexico's UFO Folklore and Hotspots",
            "publication": "Mexico News Daily",
            "date": "2020-11-02",
            "url": "https://mexiconewsdaily.com/mexico-living/mexico-attracts-people-from-outer-space-as-well/"
        }
    ],
    "cuernavaca-1976": [
        {
            "type": "article",
            "title": "Mexico News Daily: Mexico's UFO Folklore and Hotspots",
            "publication": "Mexico News Daily",
            "date": "2020-11-02",
            "url": "https://mexiconewsdaily.com/mexico-living/mexico-attracts-people-from-outer-space-as-well/"
        }
    ],
    "oaxaca-1999": [
        {
            "type": "article",
            "title": "Mexico News Daily: Mexico's UFO Folklore and Hotspots",
            "publication": "Mexico News Daily",
            "date": "2020-11-02",
            "url": "https://mexiconewsdaily.com/mexico-living/mexico-attracts-people-from-outer-space-as-well/"
        },
        {
            "type": "newspaper",
            "title": "The New Yorker: The Ruins at Monte Alban",
            "publication": "The New Yorker",
            "date": "1978-12-25",
            "url": "https://www.newyorker.com/magazine/1978/12/25/the-ruins-at-monte-alban"
        }
    ],
    "veracruz-1978": [
        {
            "type": "article",
            "title": "Mexico News Daily: Mexico's UFO Folklore and Hotspots",
            "publication": "Mexico News Daily",
            "date": "2020-11-02",
            "url": "https://mexiconewsdaily.com/mexico-living/mexico-attracts-people-from-outer-space-as-well/"
        }
    ],
    "chihuahua-1996": [
        {
            "type": "article",
            "title": "Mexico News Daily: Mexico's UFO Folklore and Hotspots",
            "publication": "Mexico News Daily",
            "date": "2020-11-02",
            "url": "https://mexiconewsdaily.com/mexico-living/mexico-attracts-people-from-outer-space-as-well/"
        }
    ],
    "managua-1972": [
        {
            "type": "newspaper",
            "title": "UPI Archives: Heavy Quake in Managua",
            "publication": "United Press International",
            "date": "1972-12-23",
            "url": "https://www.upi.com/Archives/1972/12/23/Heavy-quake-in-Managua/3681545326083/"
        },
        {
            "type": "article",
            "title": "NASA NTRS: ERTS-1 Image of Managua Earthquake Structures",
            "publication": "NASA Technical Reports Server",
            "date": "1973",
            "url": "https://ntrs.nasa.gov/citations/19730019523"
        }
    ],
    "san-salvador-1998": [
        {
            "type": "article",
            "title": "Espooky Tales: UFO Sightings in Latin America",
            "publication": "Espooky Tales",
            "date": "2022",
            "url": "https://www.espookytales.com/blog/ufo-sightings-in-latin-america/"
        }
    ],
    "antigua-2009": [
        {
            "type": "newspaper",
            "title": "Los Angeles Times: UFO Mania Sweeps Guatemala",
            "publication": "Los Angeles Times",
            "date": "1989-03-05",
            "url": "https://www.latimes.com/archives/la-xpm-1989-03-05-mn-184-story.html"
        },
        {
            "type": "article",
            "title": "Coast to Coast AM: Multiple Witnesses Film UFO Over Guatemalan City",
            "publication": "Coast to Coast AM",
            "date": "2025-05-30",
            "url": "https://news.iheart.com/featured/coast-to-coast-am/content/2025-05-30-watch-multiple-witnesses-film-mothership-ufo-over-guatemalan-city/"
        }
    ],
    "mato-grosso-1968": [
        {
            "type": "newspaper",
            "title": "Folha: Inside the 70-Year Military Investigation of Aliens in Brazil",
            "publication": "Folha de S.Paulo",
            "date": "2024-10-13",
            "url": "https://www1.folha.uol.com.br/internacional/en/brazil/2024/10/inside-the-70-year-military-investigation-of-aliens-in-brazil.shtml"
        }
    ],
    "brasilia-2010": [
        {
            "type": "newspaper",
            "title": "Folha: Inside the 70-Year Military Investigation of Aliens in Brazil",
            "publication": "Folha de S.Paulo",
            "date": "2024-10-13",
            "url": "https://www1.folha.uol.com.br/internacional/en/brazil/2024/10/inside-the-70-year-military-investigation-of-aliens-in-brazil.shtml"
        },
        {
            "type": "article",
            "title": "Portal Gov.br: Official UFO Night in Brazil",
            "publication": "Government of Brazil",
            "date": "2022-05-19",
            "url": "https://www.gov.br/en/government-of-brazil/latest-news/2022/official-ufo-night-in-brazil"
        }
    ],
    "curitiba-1981": [
        {
            "type": "newspaper",
            "title": "Folha: Inside the 70-Year Military Investigation of Aliens in Brazil",
            "publication": "Folha de S.Paulo",
            "date": "2024-10-13",
            "url": "https://www1.folha.uol.com.br/internacional/en/brazil/2024/10/inside-the-70-year-military-investigation-of-aliens-in-brazil.shtml"
        }
    ],
    "mendoza-1978": [
        {
            "type": "article",
            "title": "Discovery UK: Signal From the South, Argentina UFOs",
            "publication": "Discovery UK",
            "date": "2023",
            "url": "https://www.discoveryuk.com/mysteries/signal-from-the-south-argentina-ufos/"
        },
        {
            "type": "newspaper",
            "title": "AP Images Blog: Argentine Alien Festival at UFO Sighting Hotspot",
            "publication": "Associated Press",
            "date": "2016-02-16",
            "url": "https://apimagesblog.com/blog/2016/02/16/argentine-alien-festival-soars-at-ufo-sighting-site-hotspot"
        }
    ],
    "nasca-lines-2007": [
        {
            "type": "newspaper",
            "title": "The Guardian: Peru Reopens UFO Investigations Office",
            "publication": "The Guardian",
            "date": "2013-10-27",
            "url": "https://www.theguardian.com/world/2013/oct/27/peru-ufo-investigations-office-reopening"
        },
        {
            "type": "article",
            "title": "Nazca Lines Tour: Nazca Lines Theories and UFO Spaceport Claims",
            "publication": "Nazca Lines Tour",
            "date": "2024",
            "url": "https://www.nazcalinestour.com/nazca-lines-theories/"
        }
    ],
    "bogota-1989": [
        {
            "type": "newspaper",
            "title": "The City Paper Bogota: Shape-Shifting UFO Spotted Over Bogota",
            "publication": "The City Paper Bogota",
            "date": "2015-04-13",
            "url": "https://thecitypaperbogota.com/opinion/shape-shifting-ufo-spotted-over-bogota41211/"
        },
        {
            "type": "newspaper",
            "title": "Mirror: Shape-Changing UFO Caught on Camera Over Bogota",
            "publication": "Mirror",
            "date": "2015-04-13",
            "url": "https://www.mirror.co.uk/news/world-news/shape-changing-ufo-caught-camera-5511582"
        }
    ],
    "caracas-1997": [
        {
            "type": "newspaper",
            "title": "Scientific American Archive: A Curious Phenomenon in Venezuela",
            "publication": "Scientific American",
            "date": "1886-12-18",
            "url": "https://archive.org/details/scientific-american-1886-12-18"
        },
        {
            "type": "article",
            "title": "History: Huge, Hovering and Silent - The Mystery of Black Triangle UFOs",
            "publication": "History",
            "date": "2020-07-22",
            "url": "https://www.history.com/articles/black-triangle-ufos-facts"
        }
    ],
    "indonesia-2013": [
        {
            "type": "newspaper",
            "title": "The Jakarta Post: Indonesia's Biggest UFO Community Weighs In",
            "publication": "The Jakarta Post",
            "date": "2021-06-07",
            "url": "https://www.thejakartapost.com/life/2021/06/07/not-a-cult-indonesias-biggest-ufo-community-beta-ufo-weighs-in-on-cia-report"
        },
        {
            "type": "newspaper",
            "title": "AP: Photos Show Indonesia's UFO Festival",
            "publication": "Associated Press",
            "date": "2025-07-24",
            "url": "https://apnews.com/photo-gallery/indonesia-ufo-festival-350b16a9ce92683297619c62164beaeb"
        }
    ],
    "philippines-1984": [
        {
            "type": "newspaper",
            "title": "Inquirer: No Recorded UFO Sightings in PH, Says PhilSA",
            "publication": "Inquirer.net",
            "date": "2022-11-17",
            "url": "https://newsinfo.inquirer.net/1691904/no-recorded-ufo-sightings-in-ph-says-philsa"
        },
        {
            "type": "newspaper",
            "title": "Philstar: Space Jellyfish Seen in Parts of Philippines",
            "publication": "Philstar",
            "date": "2026-05-13",
            "url": "https://www.philstar.com/headlines/2026/05/13/2527703/space-jellyfish-seen-parts-philippines-china-rocket-exhaust-trail"
        }
    ],
    "egypt-1985": [
        {
            "type": "article",
            "title": "Fanoos: UFOs Connection With Egypt Pyramids",
            "publication": "Fanoos",
            "date": "2024",
            "url": "https://fanoos.com/supernatural/extraterrestrial-activity/ufos-connection-with-egypt-pyramids/"
        },
        {
            "type": "newspaper",
            "title": "HistoryExtra: Were the Pyramids Built by Aliens?",
            "publication": "HistoryExtra",
            "date": "2024-10-23",
            "url": "https://www.historyextra.com/period/ancient-egypt/were-pyramids-built-by-aliens-conspiracy-real-history-facts/"
        }
    ],
    "nigeria-2006": [
        {
            "type": "newspaper",
            "title": "This Day / allAfrica: UFO Crash - FG Urged to Act Fast",
            "publication": "allAfrica",
            "date": "2004-02-03",
            "url": "https://allafrica.com/stories/200402030381.html"
        }
    ],
    "tanzania-1977": [
        {
            "type": "article",
            "title": "Noblemania: Aftermath of the UFO Crash in Tanzania",
            "publication": "Noblemania",
            "date": "2014-01-25",
            "url": "https://www.noblemania.com/2014/01/aftermath-of-ufo-crash-in-tanzania.html"
        }
    ],
    "israel-1987": [
        {
            "type": "newspaper",
            "title": "Ynet News: Tel Aviv Sighting - UFO or Plane?",
            "publication": "Ynet News",
            "date": "2006-10-15",
            "url": "https://www.ynetnews.com/articles/0,7340,L-3315078,00.html"
        },
        {
            "type": "newspaper",
            "title": "Times of Israel: Glowing Streak Spurs UFO Fears",
            "publication": "The Times of Israel",
            "date": "2012-06-08",
            "url": "https://www.timesofisrael.com/glowing-streak-spurs-ufo-fears/"
        }
    ],
    "fiji-1998": [
        {
            "type": "newspaper",
            "title": "The Canberra Times: Fiji UFO Warning to Aircraft",
            "publication": "The Canberra Times",
            "date": "1989-01-21",
            "url": "https://trove.nla.gov.au/newspaper/article/120905530"
        },
        {
            "type": "newspaper",
            "title": "The Fiji Times: UFOs - Are We Closer Than Ever to an Answer?",
            "publication": "The Fiji Times",
            "date": "2023-08-02",
            "url": "https://www.fijitimes.com.fj/ufos-are-we-closer-than-ever-to-an-answer/"
        }
    ],
    "moroccan-f1-jets-2001": [
        {
            "type": "article",
            "title": "Project Blue Book Archive: Nouasseur, Morocco Radar-Visual Case File",
            "publication": "Project Blue Book Archive",
            "date": "1954-03",
            "url": "https://www.theprojectbluebookarchive.org/archive/Sanitized%20Version%20of%20Project%20Blue%20Book%20Case%20Files-PDFs-Part4/29000541.pdf"
        },
        {
            "type": "newspaper",
            "title": "Foreign Policy: The Soviet Space Junk That Became a Moroccan UFO",
            "publication": "Foreign Policy",
            "date": "2013-04-11",
            "url": "https://foreignpolicy.com/2013/04/11/wikileaked-the-soviet-space-junk-that-became-a-moroccan-ufo/"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.NEWSPAPER_CASE_RESOURCES = NEWSPAPER_CASE_RESOURCES;
}
