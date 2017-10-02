# A webapp for configurating commodity reporting for new programs

## To run the app using DHIS2 Live:

1. Clone the whole repo into "dhis-live/conf/apps".
2. Inside the DHIS2 instance, go to "App Mangement".
3. Import the application by selecting the file named "manifest.webapp".
4. You're all set!

## If you encounter problems, try:

1. Create four orgunits: Kampala (sub: Kawalaa, Kiswa, Kisenyi HC IV, Univic HC IV, Hope Clinic, Komamboga HC IV)
2. Run this on the DHIS2 server instance: “cd /var/lib/dhis2/dhis/apps; sudo git clone https://github.com/lmisuganda/ConfigurationLMIS ”
3. Under “Data Administration” → Maintenance → choose “reload Apps” and run the maintenance
4. Run the setup in the “LMIS Configuration App” (NOT test-data yet).
5. Change description from ARV to “ARV and E-MTCT Medicines Order Form”
6. Under Programs → Choose program → Assign Organisation Units (to all orgunits / root and all sub-orgunits)
7. Set privilegies to the current User under User Management (data capture + data output on ALL, not root only)
8. From “LMIS Configuration App”, run the testdata-setup
9. Doesn’t work? Perform the steps from “WHAT TO DO WHEN ENTERED DATA DOESN’T SHOW UP”
10. Run Analytics (under “Reports”) to make the test-data available for Analytics
(OPTINAL: In Pivot Table, create a table for all commodities entered)
11. Data: Event Data items → ARV → Choose all
12. Period: Only daily → Choose the data for the entry (commodity order)
13. Orgunit: Choose the registering orgunit
14. Save it as a favorite called “ARV_Order Summary Report”
15. Kjøre “dataStoreCom.js”-scriptet (legg inn “app_namespace” og “warehouse_name” )
16. Legge til orgunits groups for “nms_zone_1” osv., slik at man kan bruke det for å hente ut facility warehouse-connection




Lage orgunit-levels
Add Standard HTML Reports
Add relevant IDs and names to the Standard HTML reports
