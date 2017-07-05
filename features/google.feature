Feature: Google search

  As a developer
  I want to find github repositories by Google search
  so that fork it

  Scenario: Searching for Mindset Boas Práticas repository by Google
    Given I am open Google's search page
    When I am typing my search request "mindsetboaspraticas github" on Google
    Then I am pressing "enter" key on Google
    Then I should see that the first Google's result is "mindsetboaspraticas · GitHub"
