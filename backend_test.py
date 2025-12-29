import requests
import sys
from datetime import datetime

class HQDAPITester:
    def __init__(self, base_url="https://elegant-drinks.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                self.failed_tests.append({
                    'name': name,
                    'endpoint': endpoint,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200] if response.text else 'No response'
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'endpoint': endpoint,
                'error': str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )
        if success:
            print(f"   Email enabled: {response.get('email_enabled', 'N/A')}")
        return success

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API",
            "GET",
            "",
            200
        )
        if success:
            print(f"   Message: {response.get('message', 'N/A')}")
        return success

    def test_create_lead(self):
        """Test lead creation"""
        test_lead = {
            "name": "Test User",
            "email": "test@test.com",
            "phone": "9999999999",
            "event_type": "Wedding",
            "event_date": "2025-12-31",
            "city": "Delhi",
            "venue": "Test Venue",
            "guest_count": "100-250",
            "duration": "4-6 hours",
            "bar_type": "both",
            "theme": "Royal",
            "budget_range": "₹2-5 Lakhs",
            "message": "Test inquiry from automated testing"
        }
        
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "leads",
            200,
            data=test_lead
        )
        if success:
            print(f"   Lead ID: {response.get('id', 'N/A')}")
            return response.get('id')
        return None

    def test_get_leads(self):
        """Test getting all leads"""
        success, response = self.run_test(
            "Get Leads",
            "GET",
            "leads",
            200
        )
        if success:
            print(f"   Total leads: {len(response)}")
        return success

    def test_get_setups(self):
        """Test getting bar setups"""
        success, response = self.run_test(
            "Get All Setups",
            "GET",
            "setups",
            200
        )
        if success:
            print(f"   Total setups: {len(response)}")
        return success, response

    def test_get_setups_with_filters(self):
        """Test bar setups with filters"""
        # Test occasion filter
        success1, _ = self.run_test(
            "Get Setups - Occasion Filter (wedding)",
            "GET",
            "setups",
            200,
            params={"occasion": "wedding"}
        )
        
        # Test style filter
        success2, _ = self.run_test(
            "Get Setups - Style Filter (Royal)",
            "GET",
            "setups",
            200,
            params={"style": "Royal"}
        )
        
        # Test featured filter
        success3, _ = self.run_test(
            "Get Setups - Featured Filter",
            "GET",
            "setups",
            200,
            params={"featured": "true"}
        )
        
        return success1 and success2 and success3

    def test_get_setup_by_slug(self, slug="mehendi-soiree"):
        """Test getting specific setup by slug"""
        success, response = self.run_test(
            f"Get Setup by Slug ({slug})",
            "GET",
            f"setups/{slug}",
            200
        )
        if success:
            print(f"   Setup title: {response.get('title', 'N/A')}")
        return success

    def test_get_menus(self):
        """Test getting drinks/menus"""
        success, response = self.run_test(
            "Get All Menus",
            "GET",
            "menus",
            200
        )
        if success:
            print(f"   Total drinks: {len(response)}")
        return success

    def test_get_menus_with_filters(self):
        """Test menus with filters"""
        # Test type filter
        success1, _ = self.run_test(
            "Get Menus - Type Filter (cocktail)",
            "GET",
            "menus",
            200,
            params={"type": "cocktail"}
        )
        
        # Test type filter mocktail
        success2, _ = self.run_test(
            "Get Menus - Type Filter (mocktail)",
            "GET",
            "menus",
            200,
            params={"type": "mocktail"}
        )
        
        # Test molecular filter
        success3, _ = self.run_test(
            "Get Menus - Molecular Filter",
            "GET",
            "menus",
            200,
            params={"molecular": "true"}
        )
        
        return success1 and success2 and success3

    def test_get_testimonials(self):
        """Test getting testimonials"""
        success, response = self.run_test(
            "Get All Testimonials",
            "GET",
            "testimonials",
            200
        )
        if success:
            print(f"   Total testimonials: {len(response)}")
        
        # Test featured filter
        success2, _ = self.run_test(
            "Get Testimonials - Featured Filter",
            "GET",
            "testimonials",
            200,
            params={"featured": "true"}
        )
        
        return success and success2

    def test_get_gallery(self):
        """Test getting gallery items"""
        success, response = self.run_test(
            "Get All Gallery Items",
            "GET",
            "gallery",
            200
        )
        if success:
            print(f"   Total gallery items: {len(response)}")
        return success

    def test_get_gallery_with_filters(self):
        """Test gallery with filters"""
        # Test category filters
        success1, _ = self.run_test(
            "Get Gallery - Category Filter (wedding)",
            "GET",
            "gallery",
            200,
            params={"category": "wedding"}
        )
        
        success2, _ = self.run_test(
            "Get Gallery - Category Filter (corporate)",
            "GET",
            "gallery",
            200,
            params={"category": "corporate"}
        )
        
        success3, _ = self.run_test(
            "Get Gallery - Category Filter (private)",
            "GET",
            "gallery",
            200,
            params={"category": "private"}
        )
        
        return success1 and success2 and success3

    def test_get_packages(self):
        """Test getting packages"""
        success, response = self.run_test(
            "Get All Packages",
            "GET",
            "packages",
            200
        )
        if success:
            print(f"   Total packages: {len(response)}")
            if len(response) >= 4:
                print(f"   Package tiers: {', '.join([p.get('tier', 'N/A') for p in response])}")
        return success

    def test_get_faqs(self):
        """Test getting FAQs"""
        success, response = self.run_test(
            "Get All FAQs",
            "GET",
            "faqs",
            200
        )
        if success:
            print(f"   Total FAQs: {len(response)}")
        
        # Test category filter
        success2, _ = self.run_test(
            "Get FAQs - Category Filter (service)",
            "GET",
            "faqs",
            200,
            params={"category": "service"}
        )
        
        return success and success2

def main():
    print("=" * 60)
    print("HQ.D API Testing Suite")
    print("=" * 60)
    
    tester = HQDAPITester()
    
    # Run all tests
    print("\n📋 Testing Core Endpoints...")
    tester.test_health_check()
    tester.test_root_endpoint()
    
    print("\n📋 Testing Lead Management...")
    tester.test_create_lead()
    tester.test_get_leads()
    
    print("\n📋 Testing Bar Setups...")
    success, setups = tester.test_get_setups()
    if success and setups:
        tester.test_get_setup_by_slug(setups[0].get('slug', 'mehendi-soiree'))
    tester.test_get_setups_with_filters()
    
    print("\n📋 Testing Menus/Drinks...")
    tester.test_get_menus()
    tester.test_get_menus_with_filters()
    
    print("\n📋 Testing Testimonials...")
    tester.test_get_testimonials()
    
    print("\n📋 Testing Gallery...")
    tester.test_get_gallery()
    tester.test_get_gallery_with_filters()
    
    print("\n📋 Testing Packages...")
    tester.test_get_packages()
    
    print("\n📋 Testing FAQs...")
    tester.test_get_faqs()
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    print(f"Total Tests: {tester.tests_run}")
    print(f"Passed: {tester.tests_passed}")
    print(f"Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            print(f"\n  • {test['name']}")
            print(f"    Endpoint: {test.get('endpoint', 'N/A')}")
            if 'error' in test:
                print(f"    Error: {test['error']}")
            else:
                print(f"    Expected: {test.get('expected', 'N/A')}, Got: {test.get('actual', 'N/A')}")
    
    print("\n" + "=" * 60)
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
